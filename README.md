
# Koanprotocol Subgraphs repo

Koanprotocol Subgraphs repo. A decentralized protocol for automated token exchange on lisk, base and monad.


## Contributing

We welcome contributions to the Koan Protocol Subgraphs repository! Here's how you can get started:

### Prerequisites
- Node.js (v16 or later)
- pnpm (v7 or later)
- Git

### Goldsky Docs Links
Supported network Links: https://docs.goldsky.com/chains/supported-networks

### Development Setup

1. **Fork the repository**
   - Click the "Fork" button on the GitHub repository page

2. **Clone your fork**
   ```bash
   git clone https://github.com/koan-protocol/subgraphs.git
   cd subgraphs
   cd [subgraph name]
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Create a new branch**
   ```bash
   git checkout -b "your-contribution-branch"
   ```

### Making Changes

1. **Make your changes** to the codebase

2. **Generate types and build the project**
   ```bash
   pnpm codegen
   pnpm build
   ```

3. **Test your changes locally**
   ```bash
   pnpm test
   ```

4. **Deploy locally** (if needed)
   ```bash
   pnpm deploy
   ```

### Submitting Changes

1. **Stage your changes**
   ```bash
   git add .
   ```

2. **Commit your changes**
   ```bash
   git commit -m "Your descriptive commit message"
   ```

3. **Push to your fork**
   ```bash
   git push origin your-contribution-branch
   ```

4. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template with details about your changes
   - Submit the PR

### Code Style
- Follow the existing code style in the repository
- Include tests for new functionality
- Update documentation as needed

### Need Help?
If you have any questions or need assistance, please open an issue in the repository.