export const REELS_DATA = [
  {
    id: "reel-1",
    title: "When Java NullPointerException Hits in Production 😭",
    description: "POV: You forgot to check null in legacy enterprise codebase at 4:59 PM on a Friday. Relatable B.Tech student pain!",
    author: "@java_meme_guy",
    authorAvatar: "☕",
    source: "instagram",
    category: "Java",
    topic: "Java",
    tags: ["Java", "Meme", "Humor", "Exceptions", "Enterprise"],
    difficulty: "Beginner",
    isHypeOrMeme: true,
    eduScore: 35,
    visualType: "meme",
    memeText: "NullPointerException at line 404\nSenior Dev: 'Who pushed to main?'",
    codeSnippet: "String user = null;\nuser.toLowerCase(); // 💥 BOOM!",
    stats: { likes: 45200, views: 189000, saves: 3100, shares: 12400 },
    aiRecommendationInfo: {
      whyRecommended: "Popular meme reel frequently watched for entertainment.",
      targetInterests: ["Java", "Humor"],
      targetSkill: "Basic Exception Handling"
    }
  },
  {
    id: "reel-2",
    title: "Day in the Life of a Software Engineer at Big Tech 💻✨",
    description: "9 AM Matcha, 10 AM Standup, 11 AM Writing clean code, 2 PM Code review, 5 PM Gym. What it really takes to build real-world software.",
    author: "@tech_life_sarah",
    authorAvatar: "👩‍💻",
    source: "instagram",
    category: "Software Engineering",
    topic: "Career/Placements",
    tags: ["Software Engineering", "Career", "Lifestyle", "Coding", "Big Tech"],
    difficulty: "Beginner",
    isHypeOrMeme: false,
    eduScore: 78,
    visualType: "code",
    codeSnippet: "const engineer = {\n  focus: 'Problem Solving',\n  skills: ['DSA', 'System Design'],\n  dailyRoutine: 'Build & Scale'\n};",
    stats: { likes: 89400, views: 340000, saves: 19800, shares: 15200 },
    aiRecommendationInfo: {
      whyRecommended: "High student engagement around tech careers and software engineering practices.",
      targetInterests: ["Software Engineering", "Career/Placements"],
      targetSkill: "Industry Standards & Workflow"
    }
  },
  {
    id: "reel-3",
    title: "How to Crack Top Technical Coding Interviews 🚀",
    description: "Breakdown of the 4 core interview rounds: Problem Solving (DSA), System Design, Behavioral, and Live Pair Programming.",
    author: "@interview_prep_pro",
    authorAvatar: "🎯",
    source: "youtube",
    category: "Technical Interviews",
    topic: "Career/Placements",
    tags: ["Coding Interview", "Technical Interviews", "Software Engineering", "Placements", "DSA"],
    difficulty: "Intermediate",
    isHypeOrMeme: false,
    eduScore: 94,
    visualType: "diagram",
    diagramType: "interview_pipeline",
    codeSnippet: "// Strategy:\n1. Clarify constraints\n2. Talk out loud\n3. Brute force -> Optimize\n4. Code cleanly",
    stats: { likes: 67100, views: 245000, saves: 38400, shares: 19100 },
    aiRecommendationInfo: {
      whyRecommended: "Direct alignment with Software Engineering interview preparation and algorithmic problem solving.",
      targetInterests: ["Technical Interviews", "Software Engineering", "DSA"],
      targetSkill: "Technical Interview Mastery"
    }
  },
  {
    id: "reel-4",
    title: "Ultimate M3 Max Setup for CSE Students 🖥️⚡",
    description: "Dual 4K monitors, mechanical keyboard, ergonomic desk, and terminal setup for maximum coding productivity.",
    author: "@battlestations_daily",
    authorAvatar: "⌨️",
    source: "instagram",
    category: "Hardware",
    topic: "Hardware",
    tags: ["Hardware", "Developer Setup", "Laptops", "Productivity", "Tech Gadgets"],
    difficulty: "Beginner",
    isHypeOrMeme: false,
    eduScore: 65,
    visualType: "terminal",
    codeSnippet: "$ neofetch\nOS: macOS Sonoma / Arch Linux\nCPU: M3 Max 16-Core\nMemory: 64GB Unified",
    stats: { likes: 112000, views: 520000, saves: 24500, shares: 31000 },
    aiRecommendationInfo: {
      whyRecommended: "Tech enthusiast content focusing on hardware performance and developer productivity environments.",
      targetInterests: ["Hardware", "Productivity"],
      targetSkill: "Developer Workstation Setup"
    }
  },
  {
    id: "reel-5",
    title: "Master Data Structures & Algorithms Step-by-Step 🧠",
    description: "Stop memorizing code! Learn how to identify patterns: Two Pointers, Sliding Window, Fast & Slow Pointers, Graph BFS/DFS.",
    author: "@algo_wizard",
    authorAvatar: "🔮",
    source: "youtube",
    category: "DSA",
    topic: "DSA",
    tags: ["DSA", "Algorithms", "Data Structures", "Problem Solving", "Coding Interview"],
    difficulty: "Intermediate",
    isHypeOrMeme: false,
    eduScore: 98,
    visualType: "graph",
    codeSnippet: "function slidingWindow(arr, k) {\n  let maxSum = 0, windowSum = 0;\n  for(let i=0; i<arr.length; i++) {\n    windowSum += arr[i];\n    if(i >= k-1) {\n      maxSum = Math.max(maxSum, windowSum);\n      windowSum -= arr[i - (k-1)];\n    }\n  }\n  return maxSum;\n}",
    stats: { likes: 142000, views: 610000, saves: 94000, shares: 42000 },
    aiRecommendationInfo: {
      whyRecommended: "Core foundation for Computer Science and software engineering technical assessments.",
      targetInterests: ["DSA", "Software Engineering"],
      targetSkill: "Algorithmic Efficiency (Time & Space)"
    }
  },
  {
    id: "reel-6",
    title: "Get a $200k AI Engineer Job in 3 Days (No Coding!) 🤡",
    description: "Just copy paste prompts into ChatGPT and become a CTO overnight! Unlimited passive income guaranteed!",
    author: "@hype_guru_99",
    authorAvatar: "💸",
    source: "instagram",
    category: "AI",
    topic: "AI",
    tags: ["AI", "Hype", "Clickbait", "Jobs", "Prompts"],
    difficulty: "Beginner",
    isHypeOrMeme: true,
    eduScore: 18,
    visualType: "meme",
    memeText: "🔥 3 SECRETS TECH COMPANIES DON'T WANT YOU TO KNOW!\nGet hired instantly without writing code!",
    codeSnippet: "// NO CODE REQUIRED!\nPrompt: 'Make me rich app now'",
    stats: { likes: 32000, views: 480000, saves: 1200, shares: 8900 },
    aiRecommendationInfo: {
      whyRecommended: "Exaggerated job claim / hype content. ReelSense AI detects and filters out this clickbait noise.",
      targetInterests: ["AI Hype"],
      targetSkill: "Low-Value Content Filter"
    }
  },
  {
    id: "reel-7",
    title: "How DSA Is Used in Real Software Engineering Interviews 🏛️",
    description: "Connecting theoretical DSA (Trees, Tries, Hash Maps) to real production systems like search auto-complete and caching layers.",
    author: "@senior_system_architect",
    authorAvatar: "🏗️",
    source: "youtube",
    category: "Software Engineering",
    topic: "HLD/System Design",
    tags: ["Software Engineering", "DSA", "Technical Interviews", "System Design", "Java"],
    difficulty: "Advanced",
    isHypeOrMeme: false,
    eduScore: 99,
    visualType: "code",
    codeSnippet: "class AutoCompleteTrie {\n  class TrieNode {\n    Map<Character, TrieNode> children = new HashMap<>();\n    boolean isWord = false;\n  }\n  // Used in real search engine backend\n}",
    stats: { likes: 198000, views: 720000, saves: 115000, shares: 68000 },
    aiRecommendationInfo: {
      whyRecommended: "HIGH VALUE RECOMMENDATION! Matches multi-signal student interest in Java, DSA, and Software Engineering Interviews.",
      targetInterests: ["Software Engineering", "DSA", "Technical Interviews"],
      targetSkill: "Applied System Architecture & DSA"
    }
  },
  {
    id: "reel-8",
    title: "System Design: How Netflix Handles Millions of Streams 🎬",
    description: "Microservices architecture, CDN edge caching, Chaos Engineering, and Cassandra database sharding simplified in 60s.",
    author: "@system_design_decoded",
    authorAvatar: "⚡",
    source: "youtube",
    category: "System Design",
    topic: "HLD/System Design",
    tags: ["System Design", "HLD", "Microservices", "Cloud", "Software Engineering"],
    difficulty: "Advanced",
    isHypeOrMeme: false,
    eduScore: 96,
    visualType: "cloud",
    codeSnippet: "[Client] -> [API Gateway] -> [Auth Service]\n                         -> [Recommendation Engine]\n                         -> [CDN Edge Servers]",
    stats: { likes: 154000, views: 680000, saves: 82000, shares: 49000 },
    aiRecommendationInfo: {
      whyRecommended: "Essential High Level Design (HLD) knowledge for mid to senior engineering interviews.",
      targetInterests: ["System Design", "Software Engineering", "Cloud"],
      targetSkill: "Distributed Systems Architecture"
    }
  },
  {
    id: "reel-9",
    title: "Full Stack Web Dev Roadmap for 2026 🌐",
    description: "Frontend (HTML5, Tailwind, React/Next.js) + Backend (Node.js, PostgreSQL, Redis) + Deployment (Vercel, Docker).",
    author: "@code_with_alex",
    authorAvatar: "🚀",
    source: "instagram",
    category: "Web Development",
    topic: "Web Development",
    tags: ["Web Development", "React", "JavaScript", "Fullstack", "Frontend"],
    difficulty: "Beginner",
    isHypeOrMeme: false,
    eduScore: 90,
    visualType: "code",
    codeSnippet: "// Modern React 19 Client Component\nexport default function App() {\n  const [state, setState] = useState(null);\n  return <div className=\"glass-card\">ReelSense AI</div>;\n}",
    stats: { likes: 98000, views: 410000, saves: 53000, shares: 27000 },
    aiRecommendationInfo: {
      whyRecommended: "Comprehensive guide for practical project building and web application architecture.",
      targetInterests: ["Web Development", "Software Engineering"],
      targetSkill: "Full Stack Engineering"
    }
  },
  {
    id: "reel-10",
    title: "Cybersecurity 101: Understanding Buffer Overflow Attacks 🛡️",
    description: "How memory stack frames get corrupted in C/C++ when bounds checking is omitted, and how ASLR protects modern OS.",
    author: "@cyber_sec_hacks",
    authorAvatar: "🔐",
    source: "youtube",
    category: "Cybersecurity",
    topic: "Cybersecurity",
    tags: ["Cybersecurity", "Memory Safety", "C++", "OS", "Ethical Hacking"],
    difficulty: "Intermediate",
    isHypeOrMeme: false,
    eduScore: 93,
    visualType: "terminal",
    codeSnippet: "char buffer[8];\n// Dangerous function susceptible to stack smash\ngets(buffer); // ⚠️ No boundary check!",
    stats: { likes: 78000, views: 320000, saves: 41000, shares: 18000 },
    aiRecommendationInfo: {
      whyRecommended: "Deep-dive systems security and low-level memory inspection.",
      targetInterests: ["Cybersecurity", "OS"],
      targetSkill: "Memory Safety & Vulnerability Assessment"
    }
  },
  {
    id: "reel-11",
    title: "AWS vs Azure vs GCP: Cloud Infrastructure Battle ☁️",
    description: "Comparing EC2 vs Virtual Machines, S3 vs Blob Storage, Lambda vs Cloud Functions, and Kubernetes deployment costs.",
    author: "@cloud_architect_ben",
    authorAvatar: "☁️",
    source: "youtube",
    category: "Cloud",
    topic: "Cloud",
    tags: ["Cloud", "DevOps", "AWS", "System Design", "Software Engineering"],
    difficulty: "Intermediate",
    isHypeOrMeme: false,
    eduScore: 89,
    visualType: "cloud",
    codeSnippet: "# Terraform Infrastructure as Code\nresource \"aws_instance\" \"web_server\" {\n  ami           = \"ami-0c55b159cbfafe1f0\"\n  instance_type = \"t3.micro\"\n}",
    stats: { likes: 64000, views: 280000, saves: 36000, shares: 14000 },
    aiRecommendationInfo: {
      whyRecommended: "Cloud infrastructure provisioning is vital for scalable cloud-native applications.",
      targetInterests: ["Cloud", "System Design"],
      targetSkill: "Cloud Infrastructure & DevOps"
    }
  },
  {
    id: "reel-12",
    title: "OS Process vs Thread: What's the Difference? ⚙️",
    description: "Memory isolation, virtual memory space, stack/heap sharing, context switching overhead explained with CPU diagrams.",
    author: "@os_core_labs",
    authorAvatar: "💻",
    source: "youtube",
    category: "Operating Systems",
    topic: "OS",
    tags: ["OS", "Concurrency", "Multithreading", "Memory", "Software Engineering"],
    difficulty: "Intermediate",
    isHypeOrMeme: false,
    eduScore: 95,
    visualType: "diagram",
    diagramType: "os_memory",
    codeSnippet: "pthread_t thread1;\npthread_create(&thread1, NULL, worker_routine, NULL);\npthread_join(thread1, NULL);",
    stats: { likes: 81000, views: 390000, saves: 47000, shares: 22000 },
    aiRecommendationInfo: {
      whyRecommended: "Core computer science fundamentals essential for low-level performance optimization.",
      targetInterests: ["OS", "Software Engineering"],
      targetSkill: "Concurrent Programming & Memory Models"
    }
  },
  {
    id: "reel-13",
    title: "DBMS B-Trees & Indexing: How DB Queries Run 1000x Faster 🗄️",
    description: "Why `SELECT * FROM users WHERE email='...'` takes 10s without an index and 2ms with B+ Tree index structures.",
    author: "@dbms_masterclass",
    authorAvatar: "🛢️",
    source: "instagram",
    category: "DBMS",
    topic: "DBMS",
    tags: ["DBMS", "SQL", "Indexing", "Databases", "Software Engineering"],
    difficulty: "Intermediate",
    isHypeOrMeme: false,
    eduScore: 97,
    visualType: "graph",
    codeSnippet: "CREATE INDEX idx_user_email ON users(email);\n-- O(log N) search instead of O(N) full table scan!",
    stats: { likes: 92000, views: 410000, saves: 61000, shares: 29000 },
    aiRecommendationInfo: {
      whyRecommended: "High database efficiency and query optimization fundamentals for backend engineering.",
      targetInterests: ["DBMS", "Software Engineering"],
      targetSkill: "Database Indexing & Query Tuning"
    }
  },
  {
    id: "reel-14",
    title: "Git Rebase vs Merge: Stop Making Messy Commits! 🐙",
    description: "Clean git history vs preservation of merge commits. Interactive visual breakdown of `git rebase -i` and interactive squash.",
    author: "@git_master_dev",
    authorAvatar: "🌿",
    source: "instagram",
    category: "Git/GitHub",
    topic: "Git/GitHub",
    tags: ["Git/GitHub", "DevOps", "Version Control", "Software Engineering", "Productivity"],
    difficulty: "Beginner",
    isHypeOrMeme: false,
    eduScore: 88,
    visualType: "terminal",
    codeSnippet: "$ git checkout feature\n$ git rebase main\n# Keeps linear commit log without merge clutter!",
    stats: { likes: 110000, views: 490000, saves: 74000, shares: 38000 },
    aiRecommendationInfo: {
      whyRecommended: "Essential team collaboration tool for production codebase management.",
      targetInterests: ["Git/GitHub", "Software Engineering"],
      targetSkill: "Version Control & Git Workflows"
    }
  },
  {
    id: "reel-15",
    title: "Machine Learning: How Transformers & LLMs Actually Work 🤖",
    description: "Self-attention mechanism, Query-Key-Value matrices, positional encoding, and tokenization demystified.",
    author: "@ai_research_lab",
    authorAvatar: "🧠",
    source: "youtube",
    category: "AI",
    topic: "AI",
    tags: ["AI", "Machine Learning", "Transformers", "LLMs", "Deep Learning"],
    difficulty: "Advanced",
    isHypeOrMeme: false,
    eduScore: 96,
    visualType: "diagram",
    diagramType: "transformer_attention",
    codeSnippet: "def self_attention(Q, K, V):\n  scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)\n  weights = F.softmax(scores, dim=-1)\n  return torch.matmul(weights, V)",
    stats: { likes: 175000, views: 820000, saves: 99000, shares: 54000 },
    aiRecommendationInfo: {
      whyRecommended: "Rigorous technical foundation in modern Artificial Intelligence architecture.",
      targetInterests: ["AI", "Software Engineering"],
      targetSkill: "Neural Architectures & Attention Mechanisms"
    }
  }
];

const PROCEDURAL_TEMPLATES = [
  {
    title: "Rust Ownership & Borrowing Demystified 🦀",
    description: "Learn how Rust achieves memory safety without a garbage collector using compile-time borrow checking.",
    author: "@rust_master_labs",
    authorAvatar: "🦀",
    source: "youtube",
    category: "Software Engineering",
    topic: "Software Engineering",
    tags: ["Rust", "Systems Programming", "Memory Safety", "Software Engineering"],
    difficulty: "Advanced",
    isHypeOrMeme: false,
    visualType: "code",
    codeSnippet: "fn main() {\n  let s1 = String::from(\"ReelSense\");\n  let s2 = &s1; // Borrowed reference\n  println!(\"{}\", s2);\n}",
    aiInfo: "Essential low-level systems programming knowledge."
  },
  {
    title: "Go Routines & Channels: 100k Concurrent Tasks 🐹",
    description: "Lightweight CSP concurrency model in Golang. How Go handles thousands of concurrent connections with minimal RAM.",
    author: "@golang_daily",
    authorAvatar: "🐹",
    source: "youtube",
    category: "Software Engineering",
    topic: "Software Engineering",
    tags: ["Go", "Concurrency", "Backend", "Software Engineering"],
    difficulty: "Intermediate",
    isHypeOrMeme: false,
    visualType: "diagram",
    codeSnippet: "func worker(jobs <-chan int, results chan<- int) {\n  for j := range jobs {\n    results <- j * 2\n  }\n}",
    aiInfo: "High concurrency backend service design patterns."
  },
  {
    title: "Redis Caching Strategies: Cache-Aside vs Write-Through ⚡",
    description: "How high-traffic systems reduce database load by 95% using Redis in-memory key-value caching.",
    author: "@backend_architect",
    authorAvatar: "⚡",
    source: "youtube",
    category: "System Design",
    topic: "HLD/System Design",
    tags: ["System Design", "Redis", "Caching", "Backend", "Software Engineering"],
    difficulty: "Intermediate",
    isHypeOrMeme: false,
    visualType: "cloud",
    codeSnippet: "String cached = redis.get(key);\nif (cached == null) {\n  cached = db.query(key);\n  redis.setex(key, 3600, cached);\n}",
    aiInfo: "Critical caching architectures for high scale distributed systems."
  },
  {
    title: "Dynamic Programming: 0/1 Knapsack Pattern 🧩",
    description: "Stop fearing DP! Learn how subproblem memoization turns O(2^N) exponential complexity into O(N*W) polynomial time.",
    author: "@algo_pro",
    authorAvatar: "🧩",
    source: "youtube",
    category: "DSA",
    topic: "DSA",
    tags: ["DSA", "Dynamic Programming", "Algorithms", "Coding Interview"],
    difficulty: "Advanced",
    isHypeOrMeme: false,
    visualType: "graph",
    codeSnippet: "function knapsack(W, wt, val, n) {\n  if (n === 0 || W === 0) return 0;\n  if (memo[n][W] !== -1) return memo[n][W];\n  // Subproblem transition\n}",
    aiInfo: "Advanced algorithmic problem solving pattern."
  },
  {
    title: "Docker Multi-Stage Builds: Reduce Image Size from 1GB to 25MB 🐳",
    description: "Optimizing Dockerfile layers for production deployment. Build in node alpine and serve static assets via nginx.",
    author: "@devops_ninja",
    authorAvatar: "🐳",
    source: "instagram",
    category: "Cloud",
    topic: "Cloud",
    tags: ["Docker", "DevOps", "Cloud", "Software Engineering"],
    difficulty: "Intermediate",
    isHypeOrMeme: false,
    visualType: "terminal",
    codeSnippet: "FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html",
    aiInfo: "Production deployment optimization."
  },
  {
    title: "JWT vs Session Cookies: Web Authentication Security 🔐",
    description: "Why storing JWT tokens in localStorage makes your app vulnerable to XSS attacks, and how HttpOnly cookies solve it.",
    author: "@security_first",
    authorAvatar: "🔑",
    source: "youtube",
    category: "Cybersecurity",
    topic: "Cybersecurity",
    tags: ["Cybersecurity", "Web Development", "Authentication", "Security"],
    difficulty: "Intermediate",
    isHypeOrMeme: false,
    visualType: "terminal",
    codeSnippet: "// Secure Cookie Header\nSet-Cookie: token=eyJhbG...;\nHttpOnly; Secure; SameSite=Strict;",
    aiInfo: "Essential security standard for web applications."
  },
  {
    title: "Apache Kafka Event Streaming vs Message Queues 📬",
    description: "Event-driven architecture: How distributed commit logs enable real-time event streaming across microservices.",
    author: "@stream_architect",
    authorAvatar: "📬",
    source: "youtube",
    category: "System Design",
    topic: "HLD/System Design",
    tags: ["System Design", "Kafka", "Microservices", "Event Driven"],
    difficulty: "Advanced",
    isHypeOrMeme: false,
    visualType: "diagram",
    codeSnippet: "producer.send(new ProducerRecord<>(\"orders-topic\", orderId, payload));",
    aiInfo: "Distributed event streaming infrastructure."
  },
  {
    title: "Python NumPy Vectorization: 100x Speedup 🐍",
    description: "Ditch Python `for` loops in AI/ML data processing! How NumPy SIMD vectorized instructions run at C speed.",
    author: "@py_data_wiz",
    authorAvatar: "🐍",
    source: "instagram",
    category: "AI",
    topic: "AI",
    tags: ["AI", "Python", "NumPy", "Data Science", "Machine Learning"],
    difficulty: "Beginner",
    isHypeOrMeme: false,
    visualType: "code",
    codeSnippet: "import numpy as np\n# Fast vectorized matrix dot product\nres = np.dot(matrix_a, matrix_b)",
    aiInfo: "Foundational data processing technique for ML engineering."
  },
  {
    title: "When CSS Flexbox Finally Centers 1 Element After 3 Hours 🤡",
    description: "POV: You tried `align-items: center; justify-content: center;` and it finally worked at 3:00 AM.",
    author: "@css_humor",
    authorAvatar: "🎨",
    source: "instagram",
    category: "Web Development",
    topic: "Web Development",
    tags: ["Web Development", "CSS", "Meme", "Humor"],
    difficulty: "Beginner",
    isHypeOrMeme: true,
    visualType: "meme",
    memeText: "Senior Dev: 'Did you use grid or flexbox?'\nJunior Dev: 'I used margin-top: -347px;'",
    codeSnippet: ".container {\n  display: flex;\n  place-items: center;\n}",
    aiInfo: "Developer humor content."
  }
];

export function generateProceduralReels(count = 5, startIndex = 16) {
  const generated = [];
  for (let i = 0; i < count; i++) {
    const idx = startIndex + i;
    const template = PROCEDURAL_TEMPLATES[(idx - 16) % PROCEDURAL_TEMPLATES.length];
    
    // Dynamic random stats variation
    const likes = Math.floor(40000 + Math.random() * 150000);
    const views = Math.floor(likes * (3.5 + Math.random() * 2));
    const saves = Math.floor(likes * (0.2 + Math.random() * 0.3));
    const shares = Math.floor(likes * (0.1 + Math.random() * 0.2));

    const eduScore = template.isHypeOrMeme ? 
      Math.floor(20 + Math.random() * 20) : 
      Math.floor(86 + Math.random() * 13);

    generated.push({
      id: `reel-${idx}`,
      title: `${template.title} #${idx}`,
      description: template.description,
      author: template.author,
      authorAvatar: template.authorAvatar,
      source: template.source,
      category: template.category,
      topic: template.topic,
      tags: template.tags,
      difficulty: template.difficulty,
      isHypeOrMeme: template.isHypeOrMeme,
      eduScore: eduScore,
      visualType: template.visualType,
      codeSnippet: template.codeSnippet,
      memeText: template.memeText,
      stats: { likes, views, saves, shares },
      aiRecommendationInfo: {
        whyRecommended: template.aiInfo,
        targetInterests: [template.category, "Software Engineering"],
        targetSkill: `${template.category} Skills`
      }
    });
  }
  return generated;
}

