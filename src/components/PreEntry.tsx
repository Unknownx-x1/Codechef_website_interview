"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PreEntry({ children }: { children: React.ReactNode }) {
  const [hasEntered, setHasEntered] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "authenticating" | "granted">("idle");
  const [activeSnippets, setActiveSnippets] = useState<SelectedSnippet[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    if (sessionStorage.getItem("cc_vitc_entered") === "true") {
      setHasEntered(true);
    }

    // Select 6-10 random snippets and assign to slots on page load
    const shuffledSlots = [...POSITION_SLOTS].sort(() => 0.5 - Math.random());
    const shuffledSnippets = [...CP_SNIPPETS].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 3) + 8; // 8 to 10

    const selected: SelectedSnippet[] = [];
    for (let i = 0; i < count; i++) {
      if (i >= shuffledSlots.length || i >= shuffledSnippets.length) break;
      
      // Compute subtle variations
      const offsetX = (Math.random() * 4) - 2; // -2vw to 2vw
      const offsetY = (Math.random() * 4) - 2; // -2vh to 2vh
      const scale = 0.65 + Math.random() * 0.15; // 0.65 to 0.8
      
      // We pulse between a lower bound and an upper bound. 
      // Let's pulse between ~3.5% and ~6.5% so they breathe but never completely disappear.
      const minOpacity = 0.03 + Math.random() * 0.01; // 0.03 to 0.04
      const maxOpacity = 0.055 + Math.random() * 0.015; // 0.055 to 0.07
      
      const pulseDuration = 8 + Math.random() * 8; // 8s to 16s
      const pulseDelay = Math.random() * 8; // 0s to 8s
      
      const blurs = [0, 0.4, 0.8];
      const blur = blurs[Math.floor(Math.random() * blurs.length)];
      const parallaxSpeed = 4 + Math.random() * 4; // 4px to 8px max movement

      selected.push({
        code: shuffledSnippets[i],
        slot: shuffledSlots[i],
        offsetX,
        offsetY,
        scale,
        minOpacity,
        maxOpacity,
        pulseDuration,
        pulseDelay,
        blur,
        parallaxSpeed,
      });
    }
    setActiveSnippets(selected);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      containerRef.current.style.setProperty("--mouse-x", x.toString());
      containerRef.current.style.setProperty("--mouse-y", y.toString());
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "#anythingforclerb") {
      setStatus("authenticating");
      setTimeout(() => {
        setStatus("granted");
        sessionStorage.setItem("cc_vitc_entered", "true");
        setTimeout(() => {
          setHasEntered(true);
        }, 1800); // Wait for zoom and exit animation
      }, 1500);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  if (!isClient) return null;

  const hints = Array(20).fill("PASSWORD: #anythingforclerb");

  return (
    <>
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            ref={containerRef}
            key="pre-entry"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden font-mono"
          >
            {/* Ambient background light */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,255,71,0.05)_0%,transparent_60%)] pointer-events-none" />

            {/* CP Code Background Snippets */}
            {activeSnippets.map((snip, index) => {
              const combinedStyle: React.CSSProperties = {
                ...snip.slot.style,
                position: "absolute",
                fontSize: `${snip.scale}rem`,
                filter: snip.blur > 0 ? `blur(${snip.blur}px)` : undefined,
                color: "#E8FF47",
                transform: `${snip.slot.style.transform || ""} translate(calc(var(--mouse-x, 0) * ${snip.parallaxSpeed}px + ${snip.offsetX}vw), calc(var(--mouse-y, 0) * ${snip.parallaxSpeed}px + ${snip.offsetY}vh))`,
                transition: "transform 0.15s ease-out",
                userSelect: "none",
              };
              return (
                <motion.pre
                  key={index}
                  animate={{
                    opacity: [snip.minOpacity, snip.maxOpacity, snip.minOpacity],
                  }}
                  transition={{
                    duration: snip.pulseDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: snip.pulseDelay,
                  }}
                  className={`absolute select-none pointer-events-none font-mono text-left leading-relaxed max-w-[250px] sm:max-w-[320px] md:max-w-[400px] overflow-hidden ${snip.slot.className}`}
                  style={combinedStyle}
                >
                  <code>{snip.code}</code>
                </motion.pre>
              );
            })}
            
            {/* Marquee Hint */}
            <div className="absolute top-8 left-0 w-full overflow-hidden whitespace-nowrap opacity-30 pointer-events-none flex text-acid">
              <div className="flex animate-marquee gap-8">
                 {hints.map((hint, i) => (
                    <span key={i} className="text-sm font-bold tracking-widest">{hint}</span>
                 ))}
                 {hints.map((hint, i) => (
                    <span key={i+100} className="text-sm font-bold tracking-widest">{hint}</span>
                 ))}
              </div>
            </div>

            {/* Marquee Hint Bottom */}
            <div className="absolute bottom-8 left-0 w-full overflow-hidden whitespace-nowrap opacity-30 pointer-events-none flex text-acid">
              <div className="flex animate-marquee gap-8" style={{ animationDirection: "reverse" }}>
                 {hints.map((hint, i) => (
                    <span key={i} className="text-sm font-bold tracking-widest">{hint}</span>
                 ))}
                 {hints.map((hint, i) => (
                    <span key={i+100} className="text-sm font-bold tracking-widest">{hint}</span>
                 ))}
              </div>
            </div>

            {/* Monitor Container */}
            <motion.div
              animate={status === "granted" ? { scale: 12, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: status === "granted" ? 0.5 : 0 }}
              className="relative w-[90vw] max-w-3xl aspect-[16/10] sm:aspect-[16/9] bg-ink-950 rounded-2xl border-2 border-ink-800 shadow-[0_0_50px_rgba(232,255,71,0.05)] overflow-hidden flex flex-col items-center justify-center p-8"
              style={{
                 boxShadow: "inset 0 0 100px rgba(0,0,0,0.9), 0 0 60px rgba(232,255,71,0.1)"
              }}
            >
              {/* Screen glare/scanline */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_4px]" />
              
              {/* Glitch Effect on Grant */}
              <AnimatePresence>
                {status === "granted" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0, 0.8, 0] }}
                    transition={{ duration: 0.5, times: [0, 0.1, 0.2, 0.3, 1] }}
                    className="absolute inset-0 bg-acid mix-blend-overlay pointer-events-none z-10"
                  />
                )}
              </AnimatePresence>

              {/* Content */}
              <motion.div 
                animate={status === "granted" ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center w-full max-w-sm z-10 space-y-8"
              >
                {/* Logo/Avatar */}
                <div className="w-24 h-24 rounded-full border-2 border-acid flex items-center justify-center shadow-[0_0_20px_rgba(232,255,71,0.2)] bg-ink-900/50 backdrop-blur-sm overflow-hidden">
                   <img src="/mascot.png" alt="CodeChef Mascot" className="w-full h-full object-cover bg-white" />
                </div>

                <div className="text-center space-y-2">
                  <h1 className="text-acid text-2xl font-bold tracking-widest font-display">CC_VITC OS</h1>
                  <p className="text-ink-500 text-xs tracking-[0.2em]">AUTHORIZED PERSONNEL ONLY</p>
                </div>

                <form onSubmit={handleLogin} className="w-full space-y-5">
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={status === "authenticating" || status === "granted"}
                      placeholder="ENTER PASSWORD"
                      className={`w-full bg-ink-900/50 border backdrop-blur-sm ${status === "error" ? "border-warning text-warning" : "border-ink-800 text-acid focus:border-acid focus:shadow-[0_0_15px_rgba(232,255,71,0.2)]"} rounded-none px-4 py-3 outline-none transition-all placeholder:text-ink-500/50 font-mono tracking-widest text-center`}
                    />
                    {status === "error" && (
                      <p className="text-warning text-xs absolute -bottom-6 left-0 right-0 text-center uppercase tracking-widest">Access Denied</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status !== "idle" && status !== "error"}
                    className="w-full border-2 border-acid bg-acid/10 hover:bg-acid text-acid hover:text-ink-950 font-bold py-3 rounded-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest shadow-[0_0_15px_rgba(232,255,71,0.1)] hover:shadow-[0_0_25px_rgba(232,255,71,0.4)]"
                  >
                    {status === "authenticating" ? "Authenticating..." : status === "granted" ? "Access Granted" : "Enter System"}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Render children underneath so they are revealed */}
      <div className={!hasEntered ? "h-screen overflow-hidden pointer-events-none" : ""}>
        {children}
      </div>
    </>
  );
}

interface PositionSlot {
  id: number;
  className: string;
  style: React.CSSProperties;
}

interface SelectedSnippet {
  code: string;
  slot: PositionSlot;
  offsetX: number;
  offsetY: number;
  scale: number;
  minOpacity: number;
  maxOpacity: number;
  pulseDuration: number;
  pulseDelay: number;
  blur: number;
  parallaxSpeed: number;
}

const POSITION_SLOTS: PositionSlot[] = [
  // Top row (moved down to clear the top-8 marquee)
  { id: 1, className: "", style: { left: "4vw", top: "14vh" } },
  { id: 2, className: "", style: { right: "4vw", top: "14vh" } },
  // Bottom row (moved up to clear the bottom-8 marquee)
  { id: 3, className: "", style: { left: "4vw", bottom: "14vh" } },
  { id: 4, className: "", style: { right: "4vw", bottom: "14vh" } },
  // Far edges (hidden on mobile, desktop only)
  { id: 5, className: "hidden md:block", style: { left: "2vw", top: "45vh", transform: "translateY(-50%)" } },
  { id: 6, className: "hidden md:block", style: { right: "2vw", top: "45vh", transform: "translateY(-50%)" } },
  // Intermediate top/bottom center zones (moved to clear marquees, hidden on small/med)
  { id: 7, className: "hidden lg:block", style: { left: "22vw", top: "13vh" } },
  { id: 8, className: "hidden lg:block", style: { right: "22vw", top: "13vh" } },
  { id: 9, className: "hidden lg:block", style: { left: "22vw", bottom: "13vh" } },
  { id: 10, className: "hidden lg:block", style: { right: "22vw", bottom: "13vh" } },
];

const CP_SNIPPETS = [
  `int l = 0, r = 1e9, ans = -1;
while (l <= r) {
    int mid = l + (r - l) / 2;
    if (check(mid)) {
        ans = mid;
        r = mid - 1;
    } else {
        l = mid + 1;
    }
}`,
  `int query(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return tree[node];
    int mid = (start + end) / 2;
    return query(2 * node, start, mid, l, r) +
           query(2 * node + 1, mid + 1, end, l, r);
}`,
  `priority_queue<pii, vector<pii>, greater<pii>> pq;
pq.push({0, src});
dist[src] = 0;
while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue;
    for (auto [v, w] : adj[u]) {
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            pq.push({dist[v], v});
        }
    }
}`,
  `struct DSU {
    vector<int> parent, sz;
    DSU(int n) {
        parent.resize(n);
        iota(parent.begin(), parent.end(), 0);
        sz.assign(n, 1);
    }
    int find(int i) {
        return parent[i] == i ? i : parent[i] = find(parent[i]);
    }
    void unite(int i, int j) {
        int root_i = find(i), root_j = find(j);
        if (root_i != root_j) {
            if (sz[root_i] < sz[root_j]) swap(root_i, root_j);
            parent[root_j] = root_i;
            sz[root_i] += sz[root_j];
        }
    }
};`,
  `void dfs(int u, int p = -1) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (v != p && !visited[v]) {
            dfs(v, u);
        }
    }
}`,
  `ios_base::sync_with_stdio(false);
cin.tie(NULL);
cout.tie(NULL);`,
  `vector<bool> is_prime(N + 1, true);
is_prime[0] = is_prime[1] = false;
for (int i = 2; i * i <= N; i++) {
    if (is_prime[i]) {
        for (int j = i * i; j <= N; j += i)
            is_prime[j] = false;
    }
}`,
  `long long binpow(long long a, long long b, long long m) {
    a %= m;
    long long res = 1;
    while (b > 0) {
        if (b & 1) res = res * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return res;
}`,
  `void add(int idx, int val) {
    for (; idx < n; idx += idx & -idx)
        bit[idx] += val;
}
int query(int idx) {
    int sum = 0;
    for (; idx > 0; idx -= idx & -idx)
        sum += bit[idx];
    return sum;
}`,
  `sort(edges.begin(), edges.end());
int mst_weight = 0;
for (Edge e : edges) {
    if (dsu.find(e.u) != dsu.find(e.v)) {
        mst_weight += e.w;
        dsu.unite(e.u, e.v);
    }
}`,
  `vector<int> z_function(string s) {
    int n = s.length();
    vector<int> z(n);
    for (int i = 1, l = 0, r = 0; i < n; ++i) {
        if (i <= r) z[i] = min(r - i + 1, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) ++z[i];
        if (i + z[i] - 1 > r) l = i, r = i + z[i] - 1;
    }
    return z;
}`,
  `queue<int> q;
for (int i = 0; i < n; i++) {
    if (in_degree[i] == 0) q.push(i);
}
while (!q.empty()) {
    int u = q.front(); q.pop();
    order.push_back(u);
    for (int v : adj[u]) {
        if (--in_degree[v] == 0) q.push(v);
    }
}`,
  `for (int k = 0; k < n; ++k) {
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
        }
    }
}`,
  `struct TrieNode {
    TrieNode* children[26];
    bool is_leaf = false;
};
void insert(TrieNode* root, string word) {
    TrieNode* curr = root;
    for (char c : word) {
        int idx = c - 'a';
        if (!curr->children[idx])
            curr->children[idx] = new TrieNode();
        curr = curr->children[idx];
    }
    curr->is_leaf = true;
}`,
  `int lca(int u, int v) {
    if (is_ancestor(u, v)) return u;
    if (is_ancestor(v, u)) return v;
    for (int i = L; i >= 0; --i) {
        if (!is_ancestor(up[u][i], v))
            u = up[u][i];
    }
    return up[u][0];
}`,
  `vector<int> temp = coords;
sort(temp.begin(), temp.end());
temp.erase(unique(temp.begin(), temp.end()), temp.end());
for (int i = 0; i < n; i++) {
    compressed[i] = lower_bound(temp.begin(), temp.end(), coords[i]) - temp.begin();
}`,
  `struct custom_hash {
    size_t operator()(uint64_t x) const {
        static const uint64_t FIXED_RANDOM = 
            chrono::steady_clock::now().time_since_epoch().count();
        x ^= FIXED_RANDOM;
        return x ^ (x >> 30);
    }
};`,
  `vector<Point> hull;
for (int i = 0; i < n; i++) {
    while (hull.size() >= 2 && 
           cross_product(hull[hull.size()-2], hull.back(), pts[i]) <= 0)
        hull.pop_back();
    hull.push_back(pts[i]);
}`,
  `long long compute_hash(string const& s) {
    const int p = 31;
    const int m = 1e9 + 9;
    long long hash_value = 0;
    long long p_pow = 1;
    for (char c : s) {
        hash_value = (hash_value + (c - 'a' + 1) * p_pow) % m;
        p_pow = (p_pow * p) % m;
    }
    return hash_value;
}`,
  `Matrix multiply(Matrix A, Matrix B) {
    Matrix C;
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 2; k++)
                C.mat[i][j] = (C.mat[i][j] + A.mat[i][k] * B.mat[k][j]) % MOD;
    return C;
}`,
  `deque<int> dq;
for (int i = 0; i < n; i++) {
    if (!dq.empty() && dq.front() == i - k) dq.pop_front();
    while (!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();
    dq.push_back(i);
    if (i >= k - 1) ans.push_back(a[dq.front()]);
}`,
  `long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}
long long lcm(long long a, long long b) {
    return (a / gcd(a, b)) * b;
}`,
  `void build_hld(int u, int h) {
    head[u] = h;
    pos[u] = ++cur_pos;
    if (heavy[u] != -1)
        build_hld(heavy[u], h);
    for (int v : adj[u]) {
        if (v != parent[u] && v != heavy[u])
            build_hld(v, v);
    }
}`,
  `catalan[0] = catalan[1] = 1;
for (int i = 2; i <= n; i++) {
    catalan[i] = 0;
    for (int j = 0; j < i; j++) {
        catalan[i] = (catalan[i] + catalan[j] * catalan[i - 1 - j]) % MOD;
    }
}`,
  `void build(int node, int start, int end) {
    if (start == end) {
        tree[node] = A[start];
        return;
    }
    int mid = (start + end) / 2;
    build(2 * node, start, mid);
    build(2 * node + 1, mid + 1, end);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}`,
  `for (int i = 0; i < n; i++) {
    for (int w = W; w >= weight[i]; w--) {
        dp[w] = max(dp[w], dp[w - weight[i]] + val[i]);
    }
}`,
  `void dfs2(int u) {
    used[u] = true;
    component.push_back(u);
    for (int v : adj_rev[u]) {
        if (!used[v]) dfs2(v);
    }
}`,
  `int phi(int n) {
    int result = n;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            while (n % i == 0) n /= i;
            result -= result / i;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}`,
  `vector<int> pi_func(string s) {
    int n = s.length();
    vector<int> pi(n);
    for (int i = 1; i < n; i++) {
        int j = pi[i-1];
        while (j > 0 && s[i] != s[j]) j = pi[j-1];
        if (s[i] == s[j]) j++;
        pi[i] = j;
    }
    return pi;
}`,
  `void build_sparse_table(vector<int>& arr) {
    for (int i = 0; i < n; i++) st[i][0] = arr[i];
    for (int j = 1; j <= K; j++)
        for (int i = 0; i + (1 << j) <= n; i++)
            st[i][j] = min(st[i][j-1], st[i+(1<<(j-1))][j-1]);
}`,
  `int extgcd(int a, int b, int& x, int& y) {
    if (b == 0) {
        x = 1; y = 0;
        return a;
    }
    int x1, y1;
    int d = extgcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - y1 * (a / b);
    return d;
}`,
  `for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        if (s1[i-1] == s2[j-1])
            dp[i][j] = dp[i-1][j-1] + 1;
        else
            dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
    }
}`,
  `sort(intervals.begin(), intervals.end());
vector<vector<int>> merged;
for (auto& interval : intervals) {
    if (merged.empty() || merged.back()[1] < interval[0])
        merged.push_back(interval);
    else
        merged.back()[1] = max(merged.back()[1], interval[1]);
}`,
  `int get_centroid(int u, int p, int sz) {
    for (int v : adj[u]) {
        if (v != p && !removed[v] && sub_sz[v] > sz / 2)
            return get_centroid(v, u, sz);
    }
    return u;
}`,
  `int dx[] = {-1, 1, 0, 0};
int dy[] = {0, 0, -1, 1};
while (!q.empty()) {
    auto [x, y] = q.front(); q.pop();
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (isValid(nx, ny) && !vis[nx][ny]) {
            vis[nx][ny] = true;
            q.push({nx, ny});
        }
    }
}`,
  `for (int i = 0; i < n - 1; ++i) {
    for (auto edge : edges) {
        if (dist[edge.u] < INF)
            dist[edge.v] = min(dist[edge.v], dist[edge.u] + edge.w);
    }
}`,
  `void dfs_bridges(int u, int p = -1) {
    visited[u] = true;
    tin[u] = low[u] = ++timer;
    for (int v : adj[u]) {
        if (v == p) continue;
        if (visited[v]) {
            low[u] = min(low[u], tin[v]);
        } else {
            dfs_bridges(v, u);
            low[u] = min(low[u], low[v]);
            if (low[v] > tin[u])
                is_bridge(u, v);
        }
    }
}`,
  `for (int mask = 0; mask < (1 << n); mask++) {
    for (int u = 0; u < n; u++) {
        if (mask & (1 << u)) {
            for (int v = 0; v < n; v++) {
                if (!(mask & (1 << v)) && adj[u][v]) {
                    dp[mask | (1 << v)][v] = 
                        min(dp[mask | (1 << v)][v], dp[mask][u] + dist[u][v]);
                }
            }
        }
    }
}`,
  `long long modInverse(long long n, int p) {
    return binpow(n, p - 2, p);
}`,
  `vector<int> lp(N + 1);
vector<int> pr;
for (int i = 2; i <= N; ++i) {
    if (lp[i] == 0) {
        lp[i] = i;
        pr.push_back(i);
    }
    for (int j = 0; i * pr[j] <= N; ++j) {
        lp[i * pr[j]] = pr[j];
        if (pr[j] == lp[i]) break;
    }
}`
];
