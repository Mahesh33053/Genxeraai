/**
 * GenXEraAI - Reusable Internship Track Engine
 * Handles rendering for all 12 internship programs with track-specific
 * curriculum, projects, metadata, and domain-related background visuals.
 */

(() => {
  const TRACKS_DATA = {
    "ai-ml": {
      id: "ai-ml",
      number: "01",
      tag: "AI/ML",
      title: "AI / ML Internship",
      domain: "Artificial Intelligence & Machine Learning",
      heroDesc: "Build intelligent applications using machine learning, artificial intelligence and real-world datasets.",
      duration: "4–8 Weeks",
      mode: "Online / Hybrid",
      level: "Beginner to Advanced",
      certificate: "Verified & Shareable",
      price: "₹1499",
      originalPrice: "₹1999",
      bgClass: "track-bg-ai-ml",
      overview: {
        headline: "Build skills that matter.",
        summary: "Dive deep into modern machine learning architectures and applied generative intelligence. You will learn to clean data, engineer features, train predictive models, and deploy working AI systems into production.",
        highlights: [
          { title: "Production ML Pipelines", desc: "Train, evaluate, and serialize real models with scikit-learn and PyTorch." },
          { title: "Generative AI & LLMs", desc: "Integrate modern prompt engineering, embeddings, and API-driven agents." },
          { title: "Real-World Datasets", desc: "Work with authentic industry data spanning finance, e-commerce, and healthcare." }
        ]
      },
      learningPoints: [
        { topic: "Python for AI & Numerical Computing", desc: "NumPy arrays, Pandas data manipulation, and vector computation." },
        { topic: "Data Preprocessing & Feature Engineering", desc: "Handling missing signals, scaling, encoding, and exploratory data analysis." },
        { topic: "Machine Learning Fundamentals", desc: "Core algorithms, bias-variance tradeoff, and mathematical intuition." },
        { topic: "Supervised Learning", desc: "Linear regression, logistic regression, decision trees, random forests, and XGBoost." },
        { topic: "Unsupervised Learning & Clustering", desc: "K-Means, PCA dimensionality reduction, and anomaly detection." },
        { topic: "Model Evaluation & Hyperparameter Tuning", desc: "Cross-validation, ROC-AUC, confusion matrices, and Grid/Random Search." },
        { topic: "Deep Learning Fundamentals", desc: "Neural network forward/backpropagation, loss functions, and PyTorch basics." },
        { topic: "AI Application Development & API Deployment", desc: "Building FastAPI wrappers to serve predictive endpoints for web frontends." }
      ],
      projects: [
        {
          title: "Sales & Demand Prediction System",
          desc: "End-to-end regression model forecasting seasonal retail demand using historical store telemetry and feature engineering.",
          stack: ["Python", "XGBoost", "Pandas", "Scikit-Learn"],
          badge: "Predictive Analytics"
        },
        {
          title: "Customer Churn Prediction Engine",
          desc: "Classification pipeline identifying high-risk churn customers with probability scores and interpretable SHAP explanations.",
          stack: ["Scikit-Learn", "LightGBM", "SHAP", "FastAPI"],
          badge: "Classification"
        },
        {
          title: "Intelligent Recommendation System",
          desc: "Hybrid collaborative filtering and content-based recommendation service designed for media streaming platforms.",
          stack: ["PyTorch", "Cosine Similarity", "Embedding Layers"],
          badge: "Deep Learning"
        },
        {
          title: "Convolutional Image Classification Suite",
          desc: "Computer vision application classifying medical imaging scans and object classes with Transfer Learning (ResNet).",
          stack: ["PyTorch", "OpenCV", "Transfer Learning"],
          badge: "Computer Vision"
        }
      ],
      audience: [
        { role: "Students", detail: "Computer science, engineering, and data aspirants seeking real project portfolios." },
        { role: "Freshers", detail: "Recent graduates preparing for Machine Learning Engineer and Data Analyst interviews." },
        { role: "Beginners", detail: "Developers with basic Python familiarity ready to enter artificial intelligence." },
        { role: "Career Switchers", detail: "Professionals transitioning from legacy roles into modern data & AI teams." }
      ]
    },

    "data-science": {
      id: "data-science",
      number: "02",
      tag: "DATA",
      title: "Data Science Internship",
      domain: "Data Science & Advanced Analytics",
      heroDesc: "Extract actionable intelligence from complex datasets through exploratory analysis, statistical modeling, and predictive pipelines.",
      duration: "4–8 Weeks",
      mode: "Online / Hybrid",
      level: "Beginner to Advanced",
      certificate: "Verified & Shareable",
      price: "₹1499",
      originalPrice: "₹1999",
      bgClass: "track-bg-data-science",
      overview: {
        headline: "Build skills that matter.",
        summary: "Transform raw tabular and transactional data into strategic business value. Master structured querying, exploratory visualization, probabilistic inference, and machine-learning driven forecasting.",
        highlights: [
          { title: "Advanced SQL & Warehousing", desc: "Complex window functions, CTEs, and relational database schema queries." },
          { title: "Interactive BI Dashboards", desc: "Build automated reporting tools using Streamlit, Plotly, and Power BI." },
          { title: "Hypothesis Testing & Metrics", desc: "Design A/B testing experiments and validate statistical significance." }
        ]
      },
      learningPoints: [
        { topic: "Python & Advanced SQL Wrangling", desc: "Aggregations, joins, window functions, and database connectivity." },
        { topic: "Exploratory Data Analysis (EDA)", desc: "Uncovering outliers, correlation matrices, and distributions with Seaborn/Plotly." },
        { topic: "Statistical Inference & Hypothesis Testing", desc: "Z-tests, T-tests, ANOVA, Chi-Square, and confidence intervals." },
        { topic: "Predictive Modeling & Feature Selection", desc: "Multivariable regression, classification, and regularized models (Lasso/Ridge)." },
        { topic: "Time Series Analysis & Forecasting", desc: "Trend decomposition, moving averages, ARIMA, and seasonal forecasting." },
        { topic: "Interactive Data Dashboards", desc: "Building executive-ready web dashboards using Streamlit and Plotly Express." },
        { topic: "Big Data Pipelines & ETL Basics", desc: "Data extraction, transformation rules, and loading into analytical data stores." },
        { topic: "Storytelling & Business Insights", desc: "Translating statistical telemetry into executive recommendations." }
      ],
      projects: [
        {
          title: "E-Commerce Revenue & Cohort Analytics",
          desc: "Full customer lifetime value (LTV) and cohort retention study with automated interactive cohort charts.",
          stack: ["SQL", "Pandas", "Plotly", "Streamlit"],
          badge: "Analytics"
        },
        {
          title: "Financial Transaction Fraud Detection",
          desc: "Anomalous transaction classification using imbalanced data techniques (SMOTE) and ensemble classifiers.",
          stack: ["Scikit-Learn", "SMOTE", "Random Forest"],
          badge: "Risk Modeling"
        },
        {
          title: "Healthcare Patient Outcome Prediction",
          desc: "Predicting patient readmission probability based on clinical indicators, treatments, and demographic factors.",
          stack: ["Logistic Regression", "XGBoost", "Matplotlib"],
          badge: "Clinical Data"
        },
        {
          title: "Real-Time Stock Market Trend Visualizer",
          desc: "Automated ingestion pipeline pulling live stock tickers, computing moving average crossovers, and sending alerts.",
          stack: ["yfinance API", "Pandas", "Dash", "Python"],
          badge: "Time Series"
        }
      ],
      audience: [
        { role: "Students", detail: "Enrolled in math, statistics, engineering, or commerce looking for applied analytics." },
        { role: "Freshers", detail: "Aspirants targeting Junior Data Analyst, BI Developer, or Data Scientist positions." },
        { role: "Beginners", detail: "Anyone comfortable with spreadsheets seeking to transition to Python and SQL." },
        { role: "Career Switchers", detail: "Consultants and operations analysts wanting to build coding-backed data expertise." }
      ]
    },

    "cloud": {
      id: "cloud",
      number: "03",
      tag: "CLOUD",
      title: "Cloud (Azure / AWS) Internship",
      domain: "Cloud Architecture & Infrastructure",
      heroDesc: "Architect, deploy, and scale resilient cloud infrastructures using Amazon Web Services and Microsoft Azure.",
      duration: "4–8 Weeks",
      mode: "Online / Hybrid",
      level: "Beginner to Advanced",
      certificate: "Verified & Shareable",
      price: "₹1499",
      originalPrice: "₹1999",
      bgClass: "track-bg-cloud",
      overview: {
        headline: "Build skills that matter.",
        summary: "Understand the core architecture powering the modern Internet. From virtual private clouds and identity governance to serverless microservices and automated backups, build production-grade cloud environments.",
        highlights: [
          { title: "Dual Cloud Foundations", desc: "Hands-on experience across both AWS (Amazon) and Microsoft Azure services." },
          { title: "Serverless & Container Deployments", desc: "Deploy stateless compute using AWS Lambda, Azure Functions, and App Services." },
          { title: "Enterprise Security & IAM", desc: "Enforce least-privilege access, encryption at rest, and Virtual Private Clouds." }
        ]
      },
      learningPoints: [
        { topic: "Cloud Architecture Fundamentals", desc: "IaaS, PaaS, SaaS, shared responsibility model, and global infrastructure." },
        { topic: "Compute Services & Virtual Machines", desc: "AWS EC2 instances, Azure VMs, auto-scaling groups, and load balancers." },
        { topic: "Cloud Storage & Object Lifecycle", desc: "AWS S3 buckets, Azure Blob Storage, tiering, and CORS configuration." },
        { topic: "Virtual Networking & Security", desc: "VPCs, Subnets, Route Tables, Security Groups, and Azure Virtual Networks." },
        { topic: "Identity & Access Management (IAM)", desc: "Role-based access control, policies, MFA, and service principal authentication." },
        { topic: "Managed Databases in Cloud", desc: "Amazon RDS, DynamoDB, Azure SQL Database, and automated backup snapshots." },
        { topic: "Serverless Computing", desc: "AWS Lambda, API Gateway, Azure Functions, and event-driven architectures." },
        { topic: "Cost Optimization & Cloud Monitoring", desc: "AWS CloudWatch, Azure Monitor, budgeting alarms, and performance telemetry." }
      ],
      projects: [
        {
          title: "Multi-Tier Scalable Web Infrastructure",
          desc: "Fault-tolerant architecture with public/private subnets, Application Load Balancer, and auto-scaling VM instances.",
          stack: ["AWS VPC", "EC2", "ALB", "RDS Multi-AZ"],
          badge: "High Availability"
        },
        {
          title: "Serverless Image Processing Pipeline",
          desc: "Event-driven system that triggers AWS Lambda upon S3 upload to generate thumbnails and index metadata.",
          stack: ["AWS S3", "Lambda", "DynamoDB", "API Gateway"],
          badge: "Serverless"
        },
        {
          title: "Azure App Service Full-Stack Deployment",
          desc: "Continuous deployment of a secure containerized web application connected to an Azure SQL backend with Key Vault secrets.",
          stack: ["Azure App Service", "Azure SQL", "Key Vault"],
          badge: "Enterprise PaaS"
        },
        {
          title: "Automated Cloud Disaster Recovery Suite",
          desc: "Scripted backup automation ensuring cross-region replication, snapshot retention policies, and recovery drills.",
          stack: ["AWS Backup", "Boto3 Python", "CloudWatch"],
          badge: "DevOps & DR"
        }
      ],
      audience: [
        { role: "Students", detail: "Engineering students aiming for cloud certifications (AWS SAA, Azure AZ-900/AZ-104)." },
        { role: "Freshers", detail: "Graduates targeting Cloud Engineer, Cloud Support, or Systems Administrator roles." },
        { role: "Beginners", detail: "Developers eager to understand how their code actually runs and scales in the cloud." },
        { role: "Career Switchers", detail: "System admins and network technicians upgrading to cloud technologies." }
      ]
    },

    "devops": {
      id: "devops",
      number: "04",
      tag: "DEVOPS",
      title: "DevOps Internship",
      domain: "Continuous Integration & Deployment",
      heroDesc: "Automate delivery pipelines, containerize microservices, and manage production infrastructure with modern CI/CD tools.",
      duration: "4–8 Weeks",
      mode: "Online / Hybrid",
      level: "Beginner to Advanced",
      certificate: "Verified & Shareable",
      price: "₹1499",
      originalPrice: "₹1999",
      bgClass: "track-bg-devops",
      overview: {
        headline: "Build skills that matter.",
        summary: "Bridge the gap between development and operations. Learn Linux administration, containerize applications with Docker, orchestrate with Kubernetes, automate CI/CD pipelines, and manage Infrastructure as Code.",
        highlights: [
          { title: "Containerization Mastery", desc: "Build lean multi-stage Dockerfiles and container registries." },
          { title: "Automated CI/CD Pipelines", desc: "Build automated test, build, and deploy workflows using GitHub Actions." },
          { title: "Kubernetes Orchestration", desc: "Deploy pods, services, ingress controllers, and rolling updates." }
        ]
      },
      learningPoints: [
        { topic: "Linux Administration & Bash Scripting", desc: "Process control, systemd, user permissions, networking tools, and shell automations." },
        { topic: "Version Control & Git Branching", desc: "Git workflow, pull request governance, semantic versioning, and rebase strategies." },
        { topic: "Docker Containerization", desc: "Dockerfiles, layer caching, multi-stage builds, and Docker Compose networks." },
        { topic: "Kubernetes Cluster Architecture", desc: "Pods, Deployments, Services, ConfigMaps, Secrets, and Ingress routing." },
        { topic: "CI/CD Pipeline Automation", desc: "GitHub Actions & Jenkins workflows, automated unit tests, and artifact publishing." },
        { topic: "Infrastructure as Code (IaC)", desc: "Terraform providers, state management, modules, and declarative infrastructure." },
        { topic: "Configuration Management", desc: "Automated system provisioning and environment repeatability with Ansible." },
        { topic: "Observability & Monitoring", desc: "Prometheus metrics collection, Grafana dashboards, and centralized logging." }
      ],
      projects: [
        {
          title: "Zero-Downtime Microservices CI/CD Pipeline",
          desc: "Full continuous integration workflow testing code, building Docker images, and rolling deployments to production.",
          stack: ["GitHub Actions", "Docker", "Docker Hub", "AWS EC2"],
          badge: "CI/CD"
        },
        {
          title: "Production Kubernetes Cluster Deployment",
          desc: "Declarative Kubernetes manifest orchestrating a multi-service web application with ingress and horizontal pod autoscaling.",
          stack: ["Kubernetes", "Minikube/K8s", "Helm", "NGINX Ingress"],
          badge: "Orchestration"
        },
        {
          title: "Terraform Multi-Environment Cloud Provisioner",
          desc: "Modular Infrastructure as Code scripts provisioning staging and production VPCs, compute instances, and storage.",
          stack: ["Terraform", "HCL", "AWS", "State Management"],
          badge: "IaC"
        },
        {
          title: "Full-Stack Observability & Alerting Stack",
          desc: "Real-time monitoring infrastructure scraping application endpoints, visualizing CPU/Memory, and alerting on Slack.",
          stack: ["Prometheus", "Grafana", "Node Exporter", "Alertmanager"],
          badge: "Monitoring"
        }
      ],
      audience: [
        { role: "Students", detail: "Graduates wanting to stand out with high-demand DevOps and Site Reliability skills." },
        { role: "Freshers", detail: "Candidates preparing for DevOps Engineer, Build & Release, or Cloud Ops interviews." },
        { role: "Beginners", detail: "Software developers wanting to automate manual deployment headaches." },
        { role: "Career Switchers", detail: "System administrators transitioning into automated DevOps practices." }
      ]
    },

    "salesforce": {
      id: "salesforce",
      number: "05",
      tag: "CRM",
      title: "Salesforce Internship",
      domain: "Enterprise Cloud CRM & Development",
      heroDesc: "Master Salesforce administration, Apex backend logic, and Lightning Web Components to build enterprise CRM applications.",
      duration: "4–8 Weeks",
      mode: "Online / Hybrid",
      level: "Beginner to Advanced",
      certificate: "Verified & Shareable",
      price: "₹1499",
      originalPrice: "₹1999",
      bgClass: "track-bg-salesforce",
      overview: {
        headline: "Build skills that matter.",
        summary: "Enter the world of the world's #1 CRM platform. Learn data modeling, business automation with Flow Builder, custom backend programming with Apex, and reactive modern user interfaces with Lightning Web Components.",
        highlights: [
          { title: "Admin & Developer Tracks", desc: "Combines foundational administration with advanced Apex and LWC coding." },
          { title: "Modern Lightning Web Components", desc: "Build reactive custom frontend components using web standards." },
          { title: "Enterprise Automation", desc: "Automate complex business lifecycles using Flows, Triggers, and REST APIs." }
        ]
      },
      learningPoints: [
        { topic: "Salesforce Platform Architecture", desc: "Multi-tenant cloud architecture, standard objects, custom objects, and schema builder." },
        { topic: "Security & Sharing Architecture", desc: "Profiles, Permission Sets, OWD (Organization-Wide Defaults), and Role Hierarchies." },
        { topic: "Declarative Automation with Flows", desc: "Record-triggered flows, screen flows, scheduled flows, and business rules." },
        { topic: "Apex Programming Language", desc: "Object-oriented Apex, collections, DML operations, and trigger frameworks." },
        { topic: "SOQL & SOSL Querying", desc: "Relationship queries, filtering, aggregate results, and governor limit optimization." },
        { topic: "Lightning Web Components (LWC)", desc: "Modern JavaScript components, Lightning Data Service, wire adapters, and events." },
        { topic: "Asynchronous Apex & Integrations", desc: "Batch Apex, Queueable Apex, Scheduled Apex, and RESTful web service endpoints." },
        { topic: "Deployment & Salesforce DX", desc: "VS Code with Salesforce Extensions, scratch orgs, change sets, and packaging." }
      ],
      projects: [
        {
          title: "Custom Student Admission Portal with LWC",
          desc: "Interactive reactive portal allowing candidates to submit applications, view status, and track documents in real time.",
          stack: ["LWC", "Apex Controllers", "Lightning Design System"],
          badge: "Frontend CRM"
        },
        {
          title: "Automated Lead Management & Scoring Flow",
          desc: "End-to-end sales automation pipeline calculating lead engagement scores and routing leads to specialized sales reps.",
          stack: ["Flow Builder", "Custom Metadata", "Apex Triggers"],
          badge: "Process Automation"
        },
        {
          title: "External Weather & Inventory REST Integration",
          desc: "Custom Apex REST service synchronizing live inventory levels between external e-commerce backends and Salesforce.",
          stack: ["Apex REST", "JSON Parsing", "Named Credentials"],
          badge: "API Integration"
        },
        {
          title: "Service Cloud Support Escalation System",
          desc: "Automated ticketing workflow with milestone SLAs, automated email escalation alerts, and agent assignment rules.",
          stack: ["Service Cloud", "Omni-Channel", "Apex Batch"],
          badge: "Enterprise Solution"
        }
      ],
      audience: [
        { role: "Students", detail: "Computer science and IT students seeking high-paying enterprise ecosystem roles." },
        { role: "Freshers", detail: "Job-seekers preparing for Salesforce Certified Administrator & Platform Developer 1." },
        { role: "Beginners", detail: "Learners interested in low-code + high-code enterprise application development." },
        { role: "Career Switchers", detail: "IT professionals transitioning from legacy ERP/CRM to the Salesforce cloud." }
      ]
    },

    "python-full-stack": {
      id: "python-full-stack",
      number: "06",
      tag: "PYTHON",
      title: "Python Full Stack Internship",
      domain: "Full-Stack Web Development",
      heroDesc: "Build scalable web applications from front to back using Python, Django, FastAPI, PostgreSQL, and modern frontend frameworks.",
      duration: "4–8 Weeks",
      mode: "Online / Hybrid",
      level: "Beginner to Advanced",
      certificate: "Verified & Shareable",
      price: "₹1499",
      originalPrice: "₹1999",
      bgClass: "track-bg-python-full-stack",
      overview: {
        headline: "Build skills that matter.",
        summary: "Master the Python ecosystem for complete web engineering. Learn to craft secure relational databases, build high-concurrency APIs with FastAPI and Django REST framework, and bind them with responsive modern web frontends.",
        highlights: [
          { title: "Django & FastAPI Power", desc: "Build battery-included MVC apps and lightning-fast asynchronous REST APIs." },
          { title: "Relational Database Mastery", desc: "Design clean schemas, write SQL, and use Django ORM and SQLAlchemy." },
          { title: "Authentication & Security", desc: "Implement JWT, session auth, OAuth2, and security protection layers." }
        ]
      },
      learningPoints: [
        { topic: "Advanced Python Programming", desc: "Object-oriented design, decorators, generators, type hinting, and async/await." },
        { topic: "Frontend Fundamentals & Modern UI", desc: "Semantic HTML5, CSS3, modern Flexbox/Grid, and responsive JavaScript DOM." },
        { topic: "Django Web Framework & ORM", desc: "Model-View-Template pattern, migrations, admin customization, and authentication." },
        { topic: "Django REST Framework (DRF)", desc: "Serializers, ViewSets, permissions, token authentication, and API documentation." },
        { topic: "FastAPI & Asynchronous Endpoints", desc: "High-performance async APIs, Pydantic data validation, and OpenAPI Swagger." },
        { topic: "Relational Database Design with PostgreSQL", desc: "Schema normalization, indexing, complex joins, and connection pooling." },
        { topic: "User Authentication & Authorization", desc: "JWT tokens, password hashing (bcrypt), role-based permissions, and CSRF protection." },
        { topic: "Deployment & Production Configuration", desc: "Dockerizing Python apps, Gunicorn WSGI, Nginx reverse proxy, and cloud deployment." }
      ],
      projects: [
        {
          title: "Full-Stack EdTech Course & Quiz Platform",
          desc: "Complete learning portal featuring student enrollment, video lesson tracking, timed quizzes, and PDF certificates.",
          stack: ["Django", "PostgreSQL", "Bootstrap/CSS", "JavaScript"],
          badge: "Full-Stack LMS"
        },
        {
          title: "Real-Time Collaborative Task Manager",
          desc: "Kanban board application with drag-and-drop tasks, real-time activity feeds, and team role permissions.",
          stack: ["FastAPI", "WebSockets", "SQLAlchemy", "Tailwind CSS"],
          badge: "Async Web App"
        },
        {
          title: "Multi-Vendor Marketplace API Backend",
          desc: "Robust REST API supporting product catalogs, shopping carts, order checkouts, and stripe webhook integration.",
          stack: ["Django REST Framework", "PostgreSQL", "Redis Cache"],
          badge: "REST API"
        },
        {
          title: "Automated Web Scraper & Intelligence Dashboard",
          desc: "Periodic web scraping daemon aggregating real-time tech job postings and plotting hiring salary trends.",
          stack: ["BeautifulSoup", "FastAPI", "Pandas", "Chart.js"],
          badge: "Data + Web"
        }
      ],
      audience: [
        { role: "Students", detail: "Undergrads seeking an end-to-end full-stack portfolio in the world's most versatile language." },
        { role: "Freshers", detail: "Aspirants targeting Python Developer, Backend Engineer, or Full-Stack roles." },
        { role: "Beginners", detail: "Enthusiasts who know basic Python and want to build real interactive web software." },
        { role: "Career Switchers", detail: "Engineers moving from legacy tooling to modern Python web architectures." }
      ]
    },

    "java-full-stack": {
      id: "java-full-stack",
      number: "07",
      tag: "JAVA",
      title: "Java Full Stack Internship",
      domain: "Enterprise Java & Microservices",
      heroDesc: "Develop robust enterprise-grade applications with Java, Spring Boot, Hibernate, microservices architectures, and modern UI.",
      duration: "4–8 Weeks",
      mode: "Online / Hybrid",
      level: "Beginner to Advanced",
      certificate: "Verified & Shareable",
      price: "₹1499",
      originalPrice: "₹1999",
      bgClass: "track-bg-java-full-stack",
      overview: {
        headline: "Build skills that matter.",
        summary: "Java powers Fortune 500 enterprise backends worldwide. Master Core Java OOP concepts, Spring Boot microservices, Hibernate ORM, SQL data persistence, and connect them with modern React web frontends.",
        highlights: [
          { title: "Spring Boot Microservices", desc: "Build decoupled, scalable backend services with Spring Boot and Spring Cloud." },
          { title: "Enterprise Persistence", desc: "Spring Data JPA, Hibernate, schema transactions, and MySQL database management." },
          { title: "Full-Stack React Integration", desc: "Bind Java RESTful endpoints with modern responsive React user interfaces." }
        ]
      },
      learningPoints: [
        { topic: "Core Java & Object-Oriented Principles", desc: "Inheritance, Polymorphism, Interfaces, Exception Handling, Collections, and Streams API." },
        { topic: "Relational Database Design with MySQL", desc: "Complex queries, foreign keys, transactions (ACID), and database indexing." },
        { topic: "Spring Core & Dependency Injection", desc: "Inversion of Control (IoC), Spring Beans, Annotations, and ApplicationContext." },
        { topic: "Spring Boot & RESTful Web Services", desc: "Controller architecture, HTTP verbs, RequestBody validation, and ResponseEntity patterns." },
        { topic: "Data Persistence with Spring Data JPA & Hibernate", desc: "Entity mapping, repositories, JPQL custom queries, and pagination." },
        { topic: "Enterprise Security with Spring Security", desc: "JWT token authentication, filter chains, BCrypt password encoding, and role access." },
        { topic: "Microservices Architecture Basics", desc: "Service discovery (Eureka), API Gateway, Feign clients, and inter-service communication." },
        { topic: "Unit Testing & Packaging", desc: "JUnit 5, Mockito mock testing, Maven build lifecycle, and Docker containerization." }
      ],
      projects: [
        {
          title: "Enterprise Banking & Transaction Portal",
          desc: "Secure banking platform featuring customer account management, fund transfers, transaction histories, and PDF statements.",
          stack: ["Java", "Spring Boot", "Spring Security", "MySQL", "React"],
          badge: "FinTech App"
        },
        {
          title: "Healthcare Patient & Appointment Management System",
          desc: "Full-stack medical portal managing doctor schedules, appointment bookings, and prescription records.",
          stack: ["Spring Boot", "Hibernate", "REST APIs", "MySQL"],
          badge: "Enterprise App"
        },
        {
          title: "Microservices E-Commerce Order Fulfillment Engine",
          desc: "Distributed microservice architecture with independent Product, Order, and Payment services linked via Spring Cloud.",
          stack: ["Spring Cloud", "Eureka", "API Gateway", "Docker"],
          badge: "Microservices"
        },
        {
          title: "Corporate Employee Onboarding & Payroll Portal",
          desc: "Human resources portal managing employee lifecycle, document verifications, role permissions, and salary structures.",
          stack: ["Spring Boot", "JPA", "JWT", "Thymeleaf/React"],
          badge: "Internal Tool"
        }
      ],
      audience: [
        { role: "Students", detail: "Computer science students preparing for campus placement drives with top tech firms." },
        { role: "Freshers", detail: "Job-seekers targeting Java Developer, Software Engineer, or Associate Consultant roles." },
        { role: "Beginners", detail: "Learners with basic Java understanding ready to build industrial Spring applications." },
        { role: "Career Switchers", detail: "Developers transitioning into high-stability enterprise backend engineering." }
      ]
    },

    "full-stack-web": {
      id: "full-stack-web",
      number: "08",
      tag: "WEB DEV",
      title: "Full Stack Web Internship",
      domain: "Modern Full-Stack Web Engineering",
      heroDesc: "Master modern web development using React, Node.js, Express, MongoDB/SQL, and responsive UI design systems.",
      duration: "4–8 Weeks",
      mode: "Online / Hybrid",
      level: "Beginner to Advanced",
      certificate: "Verified & Shareable",
      price: "₹1499",
      originalPrice: "₹1999",
      bgClass: "track-bg-full-stack-web",
      overview: {
        headline: "Build skills that matter.",
        summary: "Become a versatile full-stack engineer capable of bringing web products from concept to live deployment. Master React, Node.js, asynchronous APIs, database architecture, and polished UI design.",
        highlights: [
          { title: "MERN / Modern Web Stack", desc: "End-to-end expertise spanning React frontends, Express backends, and databases." },
          { title: "Component-Driven UI", desc: "Build responsive, accessible, animated interfaces with modern CSS and hooks." },
          { title: "Real-Time WebSockets & APIs", desc: "Develop interactive features like live notifications, chat, and streaming updates." }
        ]
      },
      learningPoints: [
        { topic: "Modern JavaScript (ES6+) & TypeScript Basics", desc: "Arrow functions, destructuring, promises, async/await, and type safety fundamentals." },
        { topic: "Responsive CSS & Glassmorphism UI", desc: "CSS Flexbox, CSS Grid, media queries, CSS variables, and glassmorphic styling." },
        { topic: "React.js Component Architecture", desc: "JSX, state management (useState/useReducer), useEffect lifecycle, and custom hooks." },
        { topic: "Node.js Runtime & Express.js Backends", desc: "HTTP routing, middleware chains, error handling, and file upload pipelines." },
        { topic: "Database Modeling with MongoDB & PostgreSQL", desc: "Mongoose schemas, relational table designs, and CRUD operations." },
        { topic: "Authentication, JWT & Security", desc: "JSON Web Tokens, secure cookies, bcrypt password hashing, and CORS policies." },
        { topic: "State Management & API Integration", desc: "Context API, TanStack React Query, Axios, and REST client integration." },
        { topic: "Deployment & Performance Optimization", desc: "Vercel, Render/Railway, lighthouse speed audits, and SEO meta configuration." }
      ],
      projects: [
        {
          title: "Collaborative Real-Time Workspace & Notes",
          desc: "Full-stack collaboration tool with rich text editing, shared boards, and live cursor indicators via WebSockets.",
          stack: ["React", "Node.js", "Socket.io", "MongoDB"],
          badge: "Real-Time App"
        },
        {
          title: "Modern SaaS Analytics Dashboard",
          desc: "Subscription billing metrics dashboard with interactive graphs, user role gating, and dark/light mode toggle.",
          stack: ["React", "Express.js", "Chart.js", "Tailwind CSS"],
          badge: "SaaS Dashboard"
        },
        {
          title: "Full-Featured E-Commerce Store with Cart & Checkout",
          desc: "Complete storefront with category filtering, shopping cart state, mock payment gateway, and order status tracking.",
          stack: ["React", "Node.js", "MongoDB", "Stripe API"],
          badge: "E-Commerce"
        },
        {
          title: "Interactive Developer Community & Forum",
          desc: "Developer discussion platform supporting markdown code blocks, upvotes, comment threads, and user profiles.",
          stack: ["React", "Express.js", "PostgreSQL", "JWT"],
          badge: "Community Web"
        }
      ],
      audience: [
        { role: "Students", detail: "Aspirants looking to launch live web projects that impress recruiters during placement." },
        { role: "Freshers", detail: "Graduates targeting Frontend Developer, Web Developer, or Full-Stack Engineer roles." },
        { role: "Beginners", detail: "Learners passionate about creating visually stunning, interactive software for the web." },
        { role: "Career Switchers", detail: "Professionals seeking a direct, high-demand entry point into software engineering." }
      ]
    },

    "iot": {
      id: "iot",
      number: "09",
      tag: "IOT",
      title: "IoT Internship",
      domain: "Internet of Things & Connected Systems",
      heroDesc: "Connect the physical and digital worlds by programming microcontrollers, sensors, MQTT protocols, and cloud IoT dashboards.",
      duration: "4–8 Weeks",
      mode: "Online / Hybrid",
      level: "Beginner to Advanced",
      certificate: "Verified & Shareable",
      price: "₹1499",
      originalPrice: "₹1999",
      bgClass: "track-bg-iot",
      overview: {
        headline: "Build skills that matter.",
        summary: "Step beyond pure software into cyber-physical hardware systems. Program ESP32 and Arduino microcontrollers, interface sensor networks, transmit telemetry via MQTT, and visualize live sensor streams in cloud dashboards.",
        highlights: [
          { title: "Hardware-to-Cloud Integration", desc: "Bridge analog/digital sensor readings directly into cloud telemetric databases." },
          { title: "MQTT & Lightweight Protocols", desc: "Master publish-subscribe messaging optimized for constrained devices." },
          { title: "Smart Automation Systems", desc: "Build reactive triggers that actuate hardware relays based on sensor thresholds." }
        ]
      },
      learningPoints: [
        { topic: "Embedded C/C++ & Microcontroller Basics", desc: "Arduino IDE, ESP32 architecture, GPIO pin controls, and memory constraints." },
        { topic: "Sensor Interfacing & Signal Acquisition", desc: "Temperature, humidity, ultrasonic, PIR, gas sensors, and analog-to-digital conversion." },
        { topic: "Actuator Controls & Hardware Relays", desc: "Controlling motors, relays, OLED displays, buzzer alarms, and PWM signals." },
        { topic: "Wireless Communication Protocols", desc: "Wi-Fi networking, Bluetooth BLE, and Zigbee/LoRa wireless fundamentals." },
        { topic: "MQTT Protocol & IoT Messaging", desc: "Publish/subscribe architecture, MQTT brokers (HiveMQ/Mosquitto), and QoS levels." },
        { topic: "Cloud IoT Platforms & Dashboards", desc: "Integrating with ThingSpeak, Adafruit IO, and AWS IoT Core for telemetry charts." },
        { topic: "Edge Logic & Threshold Triggers", desc: "On-device decision making, debounce logic, and energy-saving sleep modes." },
        { topic: "IoT Security & Over-The-Air (OTA) Updates", desc: "Secure MQTT with TLS, API token auth, and wireless firmware upgrades." }
      ],
      projects: [
        {
          title: "Smart Home Environmental Monitoring System",
          desc: "Wireless node reading temperature, humidity, and air quality with live cloud dashboards and automatic fan relays.",
          stack: ["ESP32", "DHT22", "MQTT", "Adafruit IO", "C++"],
          badge: "Smart Home"
        },
        {
          title: "Industrial Machinery Asset Health Telemetry",
          desc: "Vibration and acoustic anomaly detector reporting continuous equipment health metrics and threshold alarms.",
          stack: ["Arduino", "Sensors", "Node-RED", "ThingSpeak"],
          badge: "Industrial IoT"
        },
        {
          title: "Smart Agriculture Soil & Weather Telemetry Node",
          desc: "Solar-powered agricultural field sensor checking soil moisture levels and initiating automated irrigation valves.",
          stack: ["ESP8266", "Soil Sensors", "Relay Module", "Blynk IoT"],
          badge: "AgriTech"
        },
        {
          title: "IoT Smart Energy Meter & Power Consumption Tracker",
          desc: "Non-invasive AC current sensor reading household energy load, logging kilowatt hours, and forecasting electricity bills.",
          stack: ["Current Sensor", "ESP32", "WebSockets", "Chart.js"],
          badge: "Energy Tech"
        }
      ],
      audience: [
        { role: "Students", detail: "ECE, EEE, Mechatronics, and CSE students passionate about hardware-software integration." },
        { role: "Freshers", detail: "Aspirants targeting IoT Developer, Embedded IoT Engineer, or Smart Systems roles." },
        { role: "Beginners", detail: "Makers who want to build physical computing gadgets and connected automation devices." },
        { role: "Career Switchers", detail: "Engineers moving from purely electrical domains into smart connected systems." }
      ]
    },

    "embedded-systems": {
      id: "embedded-systems",
      number: "10",
      tag: "SYSTEMS",
      title: "Embedded Systems Internship",
      domain: "Embedded Firmware & Microcontrollers",
      heroDesc: "Design low-level firmware, configure microcontroller peripherals, and implement Real-Time Operating Systems (RTOS).",
      duration: "4–8 Weeks",
      mode: "Online / Hybrid",
      level: "Beginner to Advanced",
      certificate: "Verified & Shareable",
      price: "₹1499",
      originalPrice: "₹1999",
      bgClass: "track-bg-embedded-systems",
      overview: {
        headline: "Build skills that matter.",
        summary: "Write code that directly controls silicon. Master bare-metal Embedded C, ARM Cortex-M register-level peripheral drivers, interrupt service routines, and multi-task scheduling with FreeRTOS.",
        highlights: [
          { title: "Bare-Metal Register Programming", desc: "Understand microcontroller memory maps, registers, clocks, and bit manipulation." },
          { title: "Real-Time Operating Systems (RTOS)", desc: "Write deterministic multitasking firmware using tasks, queues, and semaphores." },
          { title: "Serial Communication Protocols", desc: "Implement UART, SPI, I2C, and CAN bus protocols for robust hardware interfacing." }
        ]
      },
      learningPoints: [
        { topic: "Embedded C & Bitwise Manipulation", desc: "Pointers, memory layout, volatile keyword, bitmasks, and structures for hardware." },
        { topic: "ARM Cortex-M Architecture", desc: "Core registers, memory-mapped I/O, clock trees, and reset sequences." },
        { topic: "Microcontroller Peripherals & Drivers", desc: "GPIO configuration, Timer counters, PWM generation, and Analog-to-Digital Converters." },
        { topic: "Interrupt Subsystems (NVIC)", desc: "Interrupt latency, priority grouping, vector tables, and ISR execution safety." },
        { topic: "Serial Hardware Communication", desc: "Detailed driver implementation for UART, SPI, and I2C serial protocols." },
        { topic: "Real-Time Operating Systems (FreeRTOS)", desc: "Task creation, priority preemption, task states, mutexes, semaphores, and queues." },
        { topic: "Hardware Debugging & Signal Analysis", desc: "JTAG/SWD debugging, logic analyzer packet decoding, and oscilloscope checks." },
        { topic: "Low-Power Optimization & Watchdog Timers", desc: "Sleep modes, brownout detection, and watchdog timer fault recovery." }
      ],
      projects: [
        {
          title: "FreeRTOS Multi-Sensor Data Acquisition Engine",
          desc: "Preemptive multi-tasking firmware reading temperature, pressure, and accelerometer data with zero task starvation.",
          stack: ["ARM Cortex-M", "FreeRTOS", "Embedded C", "I2C/SPI"],
          badge: "RTOS Firmware"
        },
        {
          title: "Custom Peripheral Driver Suite from Scratch",
          desc: "Bare-metal peripheral driver library (GPIO, UART, Timer PWM) written directly from microcontroller datasheet register specs.",
          stack: ["Bare-Metal C", "Register Maps", "STM32/ARM"],
          badge: "Bare-Metal"
        },
        {
          title: "Automotive CAN Bus Node Communicator",
          desc: "Controller Area Network node transmitting vehicle engine sensor telemetry with prioritized arbitration message frames.",
          stack: ["CAN 2.0B", "Embedded C", "Transceivers"],
          badge: "Automotive"
        },
        {
          title: "Digital Waveform Generator & Storage Oscilloscope",
          desc: "Microcontroller instrument generating sinusoidal and square waves via DAC, displaying sampled inputs on an LCD.",
          stack: ["ADC/DAC", "Timers", "DMA", "Embedded C"],
          badge: "Instrumentation"
        }
      ],
      audience: [
        { role: "Students", detail: "ECE, Electrical, and Embedded engineering students targeting core hardware firms." },
        { role: "Freshers", detail: "Aspirants interviewing for Firmware Engineer, Embedded Software Engineer, or Automotive roles." },
        { role: "Beginners", detail: "Programmers who want to understand how software controls physical electrical circuits." },
        { role: "Career Switchers", detail: "Software developers wanting to dive into low-level systems programming." }
      ]
    },

    "vlsi": {
      id: "vlsi",
      number: "11",
      tag: "HARDWARE",
      title: "VLSI Internship",
      domain: "Very Large Scale Integration & Chip Design",
      heroDesc: "Learn digital circuit design, Verilog HDL coding, FPGA synthesis, and functional verification for semiconductor design.",
      duration: "4–8 Weeks",
      mode: "Online / Hybrid",
      level: "Beginner to Advanced",
      certificate: "Verified & Shareable",
      price: "₹1499",
      originalPrice: "₹1999",
      bgClass: "track-bg-vlsi",
      overview: {
        headline: "Build skills that matter.",
        summary: "Enter the booming semiconductor industry. Learn digital logic design, write synthesizable Verilog HDL, architect Finite State Machines (FSMs), verify designs with testbenches, and synthesize logic on FPGA platforms.",
        highlights: [
          { title: "Synthesizable Verilog HDL", desc: "Write behavioral, dataflow, and structural hardware description models." },
          { title: "FPGA Design & EDA Tools", desc: "Synthesize and implement RTL designs using industry-standard EDA environments." },
          { title: "Verification & Testbenches", desc: "Write exhaustive self-checking testbenches and verify timing waveforms." }
        ]
      },
      learningPoints: [
        { topic: "Digital Logic Design & CMOS Foundations", desc: "Combinational and sequential circuits, setup/hold times, flip-flops, and clocking." },
        { topic: "Verilog HDL Syntax & Modeling", desc: "Data types, operators, continuous assignment, always blocks, and non-blocking statements." },
        { topic: "Combinational Circuit Architectures", desc: "Adders (Ripple Carry, Carry-Lookahead), multiplexers, decoders, and priority encoders." },
        { topic: "Sequential Systems & Registers", desc: "Synchronous/asynchronous counters, shift registers, and clock dividers." },
        { topic: "Finite State Machine (FSM) Design", desc: "Mealy and Moore state machines, one-hot encoding, state transition diagrams, and glitch reduction." },
        { topic: "Testbench Writing & Functional Verification", desc: "Task, functions, stimulus generation, assertion checks, and waveform debugging." },
        { topic: "Memory Architectures & FIFO Design", desc: "Synchronous FIFO buffers, circular pointers, and dual-port SRAM modeling." },
        { topic: "FPGA Synthesis & Static Timing Analysis", desc: "RTL elaboration, synthesis constraints, mapping, and timing slack analysis." }
      ],
      projects: [
        {
          title: "32-Bit Pipelined RISC Processor ALU & Datapath",
          desc: "Arithmetic Logic Unit supporting logical, arithmetic, and comparison operations with status flags and hazard handling.",
          stack: ["Verilog HDL", "ModelSim", "RTL Synthesis"],
          badge: "Processor Design"
        },
        {
          title: "High-Speed Synchronous FIFO Memory Buffer",
          desc: "Circular pointer FIFO buffer with programmable Almost Full / Almost Empty flag detection and boundary checks.",
          stack: ["Verilog HDL", "Testbench Verification", "EDA Tools"],
          badge: "Memory Subsystem"
        },
        {
          title: "Intelligent Traffic Light Controller FSM",
          desc: "Mealy state machine managing multi-lane intersection traffic with pedestrian sensor inputs and emergency overrides.",
          stack: ["Verilog HDL", "State Machines", "Waveform Simulation"],
          badge: "Sequential Logic"
        },
        {
          title: "Hardware Cryptographic Engine (AES-128 / DES Block)",
          desc: "FPGA hardware accelerator computing cryptographic encryption rounds with parallelized substitution boxes.",
          stack: ["Verilog HDL", "Xilinx Vivado", "FPGA Implementation"],
          badge: "Hardware Security"
        }
      ],
      audience: [
        { role: "Students", detail: "ECE and Microelectronics students targeting premier semiconductor and chip companies." },
        { role: "Freshers", detail: "Aspirants preparing for VLSI Design Engineer, Verification Engineer, or FPGA roles." },
        { role: "Beginners", detail: "Electronics enthusiasts wanting hands-on exposure to digital circuit modeling." },
        { role: "Career Switchers", detail: "Engineers from testing/verification wanting to move to chip design." }
      ]
    },

    "final-year-offline": {
      id: "final-year-offline",
      number: "12",
      tag: "OFFLINE",
      title: "Final Year Offline Internship",
      domain: "Intensive 3-Month In-Office Capstone",
      heroDesc: "An intensive 3-month in-office internship working directly on production projects under senior engineering mentors.",
      duration: "3 Months (Offline)",
      mode: "Offline In-Office",
      level: "Final Year Capstone",
      certificate: "Verified Project & Internship Credentials",
      price: "₹1499",
      originalPrice: "₹1999",
      bgClass: "track-bg-final-year-offline",
      overview: {
        headline: "Build skills that matter.",
        summary: "Experience a true company work culture before graduating. Work directly in our Hyderabad office on client-grade production software, attend daily agile scrums, complete guided code reviews, and build your university capstone project with senior architects.",
        highlights: [
          { title: "Direct In-Office Mentorship", desc: "Collaborate face-to-face with senior engineers and domain technical leads." },
          { title: "University Capstone Ready", desc: "Complete IEEE/industry standard major projects with full technical documentation." },
          { title: "Placement & Interview Drills", desc: "Rigorous technical mock interviews, resume structuring, and code defense sessions." }
        ]
      },
      learningPoints: [
        { topic: "Full Software Development Lifecycle (SDLC)", desc: "Requirement analysis, architecture documentation, design patterns, and sprint planning." },
        { topic: "Real-Time Production Codebase Standards", desc: "Modular architecture, clean coding practices, naming conventions, and linting." },
        { topic: "Agile Sprints & Daily Standups", desc: "Jira/ticket tracking, sprint retrospectives, sprint planning, and team velocity." },
        { topic: "Collaborative Git & Production Code Reviews", desc: "Feature branching, pull requests, resolving merge conflicts, and code quality audits." },
        { topic: "Comprehensive Capstone Project Execution", desc: "Selecting, architecting, and completing an end-to-end multi-tier major project." },
        { topic: "Project Defense & Academic Documentation", desc: "Writing IEEE formatted project reports, UML architecture diagrams, and slide decks." },
        { topic: "Hardware / Software Lab Infrastructure Access", desc: "Physical workstation, testing lab equipment, high-speed servers, and debugging tools." },
        { topic: "Technical Interview & Portfolio Optimization", desc: "Live mock interviews, technical project defense training, and LinkedIn optimization." }
      ],
      projects: [
        {
          title: "Production Enterprise Management System",
          desc: "Full-scale multi-tier application built during the 3-month tenure with microservices architecture and automated CI/CD.",
          stack: ["React", "Spring / Django", "PostgreSQL", "Docker"],
          badge: "Major Capstone"
        },
        {
          title: "Deep Tech AI / IoT Real-Time Hardware Project",
          desc: "Physical embedded hardware unit sending real-time environmental data to an AI model for anomaly classification.",
          stack: ["Embedded Hardware", "Python AI", "Cloud IoT", "Web Portal"],
          badge: "Hardware + AI"
        },
        {
          title: "Secure Distributed FinTech Microservice",
          desc: "Transaction processing gateway with tokenized payments, audit logs, and fraud detection layers.",
          stack: ["Java / Node", "Redis", "PostgreSQL", "OAuth2"],
          badge: "FinTech Capstone"
        },
        {
          title: "Published Academic / Industry Project Report & Defense",
          desc: "Complete documentation package including architectural schematics, test coverage reports, and viva presentation.",
          stack: ["UML Diagrams", "IEEE Paper Format", "Code Defense"],
          badge: "Final Year Thesis"
        }
      ],
      audience: [
        { role: "Final Year Students", detail: "B.Tech, B.E., MCA, and M.Tech students needing official 3-month internship credits." },
        { role: "Degree Capstone Teams", detail: "Groups seeking genuine, non-plagiarized major project development and guidance." },
        { role: "Immediate Job Seekers", detail: "Candidates aiming to bridge the gap between college theory and corporate expectations." },
        { role: "Placement Aspirants", detail: "Students seeking verified work experience to highlight on their resumes and LinkedIn." }
      ]
    }
  };

  // Determine current track slug from URL
  function getCurrentTrackSlug() {
    const params = new URLSearchParams(window.location.search);
    const querySlug = params.get("track");
    if (querySlug && TRACKS_DATA[querySlug]) {
      return querySlug;
    }

    // Check path: e.g. /internships/ai-ml
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart && TRACKS_DATA[lastPart]) {
      return lastPart;
    }

    // Default to ai-ml if not found
    return "ai-ml";
  }

  const currentSlug = getCurrentTrackSlug();
  const track = TRACKS_DATA[currentSlug] || TRACKS_DATA["ai-ml"];

  // Update page title and meta
  document.title = `${track.title} — GenXEraAI Internships`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = track.heroDesc;

  // Dynamic Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.rel = "canonical";
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = `https://www.genxeraai.com/internships/${track.id}`;

  // Dynamic OpenGraph & Twitter
  const updateMetaProperty = (prop, val) => {
    let el = document.querySelector(`meta[property="${prop}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("property", prop);
      document.head.appendChild(el);
    }
    el.content = val;
  };
  const updateMetaName = (name, val) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", name);
      document.head.appendChild(el);
    }
    el.content = val;
  };

  updateMetaProperty("og:title", `${track.title} — GenXEraAI Internships`);
  updateMetaProperty("og:description", track.heroDesc);
  updateMetaProperty("og:url", `https://www.genxeraai.com/internships/${track.id}`);
  updateMetaName("twitter:title", `${track.title} — GenXEraAI Internships`);
  updateMetaName("twitter:description", track.heroDesc);

  // Dynamic JSON-LD Schema
  const schemaElem = document.getElementById("track-schema");
  if (schemaElem) {
    schemaElem.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": track.title,
      "description": track.overview ? track.overview.summary : track.heroDesc,
      "provider": {
        "@type": "Organization",
        "name": "GenXEraAI",
        "url": "https://www.genxeraai.com",
        "logo": "https://www.genxeraai.com/assets/logos/logo.png"
      },
      "offers": {
        "@type": "Offer",
        "price": "1499",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "category": "Technology Internship"
      },
      "timeToComplete": track.duration,
      "educationalCredentialAwarded": "Verifiable Digital Credential"
    });
  }

  // Apply theme from localStorage
  const body = document.body;
  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem("genxeraai-theme") || "light";
  } catch (_) {}
  body.dataset.theme = savedTheme === "dark" ? "dark" : "light";
  body.classList.add(track.bgClass);

  // Setup Theme Toggle
  const toggle = document.querySelector(".theme-toggle");
  const symbol = document.querySelector(".theme-symbol");
  const updateThemeUI = (theme) => {
    body.dataset.theme = theme;
    const dark = theme === "dark";
    if (toggle) toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    if (symbol) symbol.textContent = dark ? "☾" : "☼";
    try { localStorage.setItem("genxeraai-theme", theme); } catch (_) {}
  };
  updateThemeUI(body.dataset.theme);
  if (toggle) {
    toggle.addEventListener("click", () => {
      const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
      updateThemeUI(nextTheme);
    });
  }

  // Header scroll shadow
  const header = document.querySelector(".site-header");
  if (header) {
    const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  // Mobile menu
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuButton && nav) {
    const closeMenu = () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    };
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  }

  // Render hero content
  const heroContainer = document.getElementById("track-hero-content");
  if (heroContainer) {
    heroContainer.innerHTML = `
      <div class="track-hero-inner reveal is-visible">
        <nav class="track-breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li><a href="/#home">Home</a></li>
            <li><span class="crumb-sep">/</span><a href="/#internships">Internships</a></li>
            <li><span class="crumb-sep">/</span><span class="crumb-current" aria-current="page">${track.title}</span></li>
          </ol>
        </nav>
        <div class="track-hero-badge">
          <span class="badge-dot"></span>
          <span>GENXERAAI INTERNSHIP // TRACK_${track.number}</span>
          <span class="badge-tag">${track.tag}</span>
        </div>
        <h1 class="track-hero-title">${track.title}</h1>
        <p class="track-hero-desc">${track.heroDesc}</p>

        <div class="track-meta-pills">
          <div class="meta-pill">
            <span class="meta-label">Duration</span>
            <span class="meta-value">${track.duration}</span>
          </div>
          <div class="meta-pill">
            <span class="meta-label">Mode</span>
            <span class="meta-value">${track.mode}</span>
          </div>
          <div class="meta-pill">
            <span class="meta-label">Level</span>
            <span class="meta-value">${track.level}</span>
          </div>
          <div class="meta-pill">
            <span class="meta-label">Certificate</span>
            <span class="meta-value">${track.certificate}</span>
          </div>
          <div class="meta-pill price-pill">
            <span class="meta-label">Starting Price</span>
            <span class="meta-value price-highlight">
              <span class="price-strikethrough">${track.originalPrice}</span>
              ${track.price}
            </span>
          </div>
        </div>

        <div class="track-hero-actions">
          <a class="button button-primary track-hero-enroll" href="${getWhatsAppTrackUrl(track.title)}" target="_blank" rel="noopener noreferrer">Enroll Now <span>→</span></a>
          <a class="button button-outline" href="/#internships">← View All Internships</a>
        </div>
      </div>
    `;
  }

  // Render Overview
  const overviewContainer = document.getElementById("track-overview-content");
  if (overviewContainer) {
    overviewContainer.innerHTML = `
      <div class="track-overview-shell reveal is-visible">
        <div class="overview-lead">
          <p class="eyebrow">Track Overview</p>
          <h2>${track.overview.headline}</h2>
          <p class="overview-body">${track.overview.summary}</p>
        </div>
        <div class="overview-highlights-grid">
          ${track.overview.highlights.map(hl => `
            <div class="highlight-card">
              <span class="highlight-icon">✓</span>
              <h4>${hl.title}</h4>
              <p>${hl.desc}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  // Render What You'll Learn
  const learnContainer = document.getElementById("track-learn-content");
  if (learnContainer) {
    learnContainer.innerHTML = `
      <div class="section-heading reveal is-visible">
        <p class="eyebrow">Curriculum Architecture</p>
        <h2>What You'll <em>Learn</em></h2>
        <p>A rigorous curriculum structured for practical job readiness and portfolio execution.</p>
      </div>
      <div class="learn-grid reveal is-visible">
        ${track.learningPoints.map((item, index) => `
          <div class="learn-card">
            <div class="learn-num">0${index + 1}</div>
            <div class="learn-body">
              <h3>${item.topic}</h3>
              <p>${item.desc}</p>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // Render Projects
  const projectsContainer = document.getElementById("track-projects-content");
  if (projectsContainer) {
    projectsContainer.innerHTML = `
      <div class="section-heading reveal is-visible">
        <p class="eyebrow">Portfolio Projects</p>
        <h2>Build <em>real projects.</em></h2>
        <p>Deploy tangible software solutions that prove your capabilities to hiring managers.</p>
      </div>
      <div class="projects-grid reveal is-visible">
        ${track.projects.map(proj => `
          <div class="project-card">
            <div class="project-head">
              <span class="project-badge">${proj.badge}</span>
              <span class="project-arrow">↗</span>
            </div>
            <h3>${proj.title}</h3>
            <p>${proj.desc}</p>
            <div class="project-stack">
              ${proj.stack.map(stk => `<span class="stack-pill">${stk}</span>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // Render Program Structure Timeline
  const structureContainer = document.getElementById("track-structure-content");
  if (structureContainer) {
    const steps = [
      { num: "01", title: "Learning", tag: "Foundations", desc: "Core conceptual masterclasses, interactive coding drills, and live architectural walk-throughs." },
      { num: "02", title: "Hands-on Tasks", tag: "Guided Labs", desc: "Weekly guided problem sets, code debugging sessions, and mentor-assisted laboratory tasks." },
      { num: "03", title: "Projects", tag: "Implementation", desc: "End-to-end development of real-world capstone software with version-controlled commits." },
      { num: "04", title: "Assessment", tag: "Evaluation", desc: "Practical code review, live architecture defense, logic evaluation, and anti-proxy auditing." },
      { num: "05", title: "Certificate", tag: "Credential", desc: "Verified digital credential with permanent validation URL and tamper-proof code portfolio verification." }
    ];

    structureContainer.innerHTML = `
      <div class="section-heading reveal is-visible">
        <p class="eyebrow">Program Structure</p>
        <h2>Program <em>Structure</em></h2>
        <p>Your step-by-step trajectory from onboarding to industry certification.</p>
      </div>
      <div class="structure-timeline reveal is-visible">
        ${steps.map(step => `
          <div class="timeline-node">
            <div class="node-marker">
              <span class="node-num">${step.num}</span>
            </div>
            <div class="node-content">
              <span class="node-tag">${step.tag}</span>
              <h3>${step.title}</h3>
              <p>${step.desc}</p>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // Render Who Is This For
  const audienceContainer = document.getElementById("track-audience-content");
  if (audienceContainer) {
    audienceContainer.innerHTML = `
      <div class="section-heading reveal is-visible">
        <p class="eyebrow">Who Is This For?</p>
        <h2>Engineered for <em>Your Stage</em></h2>
        <p>No unnecessary prerequisites. Clear progression tailored to your background.</p>
      </div>
      <div class="audience-grid reveal is-visible">
        ${track.audience.map(aud => `
          <div class="audience-card">
            <div class="audience-badge">For</div>
            <h3>${aud.role}</h3>
            <p>${aud.detail}</p>
          </div>
        `).join("")}
      </div>
    `;
  }

  // Render Other Tracks for Deep Back-linking & SEO Crawlability
  const otherTracksContainer = document.getElementById("other-tracks-content");
  if (otherTracksContainer) {
    const otherTracks = Object.values(TRACKS_DATA).filter(t => t.id !== track.id);
    otherTracksContainer.innerHTML = `
      <div class="section-heading reveal is-visible">
        <p class="eyebrow">Explore Other Tracks</p>
        <h2>Master Multiple <em>Disciplines</em></h2>
        <p>Cross-disciplinary skills make modern engineers stand out. Explore all 12 hands-on tracks.</p>
      </div>
      <div class="other-tracks-grid reveal is-visible">
        ${otherTracks.map(t => `
          <a class="other-track-card" href="/internships/${t.id}">
            <div class="other-track-header">
              <span class="track-tag">${t.tag}</span>
              <span class="other-track-num">TRACK_${t.number}</span>
            </div>
            <h4>${t.title}</h4>
            <p>${t.heroDesc}</p>
            <span class="other-track-link">View Track Details <b>↗</b></span>
          </a>
        `).join("")}
      </div>
    `;
  }

  // Pre-fill enrollment select dropdown
  const selectElem = document.getElementById("enroll-program-select");
  if (selectElem) {
    // Populate all 12 options
    selectElem.innerHTML = Object.values(TRACKS_DATA).map(t => `
      <option value="${t.title}" ${t.id === track.id ? "selected" : ""}>${t.title} (${t.price})</option>
    `).join("");
  }

  // Helper functions for Program-Specific WhatsApp URLs
  function getWhatsAppTrackMessage(trackTitle) {
    let title = (trackTitle || "").trim();
    if (!title.toLowerCase().endsWith("internship")) {
      title += " Internship";
    }
    return `Hi GenXEraAI, I am interested in enrolling in the ${title}.`;
  }

  function getWhatsAppTrackUrl(trackTitle) {
    const msg = getWhatsAppTrackMessage(trackTitle);
    return `https://wa.me/919390560407?text=${encodeURIComponent(msg)}`;
  }

  // Update header enroll button
  const headerEnrollBtn = document.getElementById("header-enroll-btn");
  if (headerEnrollBtn) {
    headerEnrollBtn.href = getWhatsAppTrackUrl(track.title);
    headerEnrollBtn.target = "_blank";
    headerEnrollBtn.rel = "noopener noreferrer";
  }

  // Update direct CTA WhatsApp button
  const directWaBtn = document.getElementById("cta-direct-wa-btn");
  if (directWaBtn) {
    directWaBtn.href = getWhatsAppTrackUrl(track.title);
  }

  // Update floating WhatsApp button context for current track
  const floatingWa = document.getElementById("floating-whatsapp");
  if (floatingWa) {
    floatingWa.href = getWhatsAppTrackUrl(track.title);
    floatingWa.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(floatingWa.href, "_blank", "noopener,noreferrer");
    });
  }

  // When program dropdown changes, keep direct WhatsApp CTA in sync
  if (selectElem && directWaBtn) {
    selectElem.addEventListener("change", () => {
      directWaBtn.href = getWhatsAppTrackUrl(selectElem.value);
    });
  }

  // Handle Enrollment Form Submit -> WhatsApp
  const form = document.getElementById("track-enroll-form");
  const formStatus = document.getElementById("track-form-status");
  if (form && formStatus) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const name = form.elements.name ? form.elements.name.value.trim() : "";
      const selectedTrack = (form.elements.program && form.elements.program.value) ? form.elements.program.value : track.title;

      formStatus.className = "form-status success";
      formStatus.innerHTML = `<strong>Connecting to WhatsApp...</strong> Redirecting to GenXEraAI admissions counselor for <em>${selectedTrack}</em>.`;
      formStatus.focus();

      let waMsg = getWhatsAppTrackMessage(selectedTrack);
      if (name) {
        waMsg += ` My name is ${name}.`;
      }
      const waUrl = `https://wa.me/919390560407?text=${encodeURIComponent(waMsg)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");

      form.reset();
      if (selectElem) {
        selectElem.value = track.title;
      }
    });
  }

  // Set current year
  const yearElem = document.getElementById("year");
  if (yearElem) {
    yearElem.textContent = String(new Date().getFullYear());
  }

  // Legal Dialog Modal Handlers
  const legalDialog = document.querySelector("#legal-modal");
  const modalTitle = document.querySelector("#modal-title");
  const modalBody = document.querySelector("#modal-body");
  const modalClose = document.querySelector("#modal-close");

  const LEGAL_CONTENT = {
    privacy: {
      title: "Privacy Policy",
      content: `<p><strong>Effective Date:</strong> January 2025</p>
<p>At GenXEraAI, we are dedicated to protecting the privacy of our students, trainees, and visitors.</p>
<p><strong>1. Information Collection:</strong> We collect contact information (such as your full name, email address, phone number, and academic background) strictly for processing internship enrollments, coordinating mentor sessions, and issuing verified certificates.</p>
<p><strong>2. Data Use:</strong> Your data is used exclusively to facilitate academic training, communicate curriculum updates, and track milestone assessments. We do not sell, rent, or lease your personal information to third parties.</p>
<p><strong>3. Communications:</strong> We may send relevant updates regarding your program or admissions inquiries via WhatsApp, email, or telephone. You may opt out at any time.</p>
<p><strong>4. Contact:</strong> If you have privacy inquiries, please contact us at <a href="mailto:genxeraai@gmail.com">genxeraai@gmail.com</a>.</p>`
    },
    terms: {
      title: "Terms of Service",
      content: `<p><strong>Effective Date:</strong> January 2025</p>
<p>Welcome to GenXEraAI. By accessing our platform or enrolling in any of our 12 internship programs, you agree to these Terms of Service.</p>
<p><strong>1. Program Access:</strong> Enrolled participants receive structured curriculum roadmaps, project source code, guidance materials, and mentor support. All materials are proprietary and intended solely for individual educational use.</p>
<p><strong>2. Certification Criteria:</strong> Verifiable digital credentials are awarded upon successful completion of core learning milestones, assignments, and practical project deliverables.</p>
<p><strong>3. Code of Conduct:</strong> Trainees must adhere to academic integrity, mutual respect during mentorship sessions, and authentic project submissions.</p>
<p><strong>4. Fees & Access:</strong> The program fee (starting at ₹1499) grants full access to the specified track resources, lab guidelines, and verification infrastructure.</p>`
    },
    security: {
      title: "Platform Security & Verification",
      content: `<p>At GenXEraAI, security and credential authenticity are paramount.</p>
<p><strong>1. Tamper-Proof Credentials:</strong> Every digital certificate issued by GenXEraAI is embedded with a unique verification token and permanent URL for employer and academic validation.</p>
<p><strong>2. Data Transmission:</strong> All data transmissions are encrypted using standard TLS/HTTPS protocols.</p>
<p><strong>3. Infrastructure Integrity:</strong> Our evaluations, attendance audits, and project verification systems are continuously monitored to maintain program integrity.</p>
<p>For questions or verification support, contact <a href="mailto:genxeraai@gmail.com">genxeraai@gmail.com</a>.</p>`
    }
  };

  document.querySelectorAll(".legal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.modal;
      if (LEGAL_CONTENT[type] && legalDialog) {
        modalTitle.textContent = LEGAL_CONTENT[type].title;
        modalBody.innerHTML = LEGAL_CONTENT[type].content;
        legalDialog.showModal();
      }
    });
  });

  if (modalClose && legalDialog) {
    modalClose.addEventListener("click", () => legalDialog.close());
    legalDialog.addEventListener("click", (e) => {
      if (e.target === legalDialog) legalDialog.close();
    });
  }
})();
