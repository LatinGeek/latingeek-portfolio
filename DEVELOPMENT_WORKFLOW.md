# Development Workflow

## 🚀 Before Pushing to Git - ALWAYS TEST BUILD!

### The Problem We Experienced:
We pushed code with dynamic imports for packages that weren't installed, causing Vercel build failures.

### The Solution: Test Build Workflow

## 1. Manual Test Build (Recommended)
```bash
# Run the test build script
npm run test-build

# Or run it directly
./test-build.sh
```

**What it checks:**
- ✅ Node.js and npm versions
- ✅ Dependencies installation
- ✅ TypeScript compilation
- ✅ ESLint rules
- ✅ Next.js build
- ✅ Bundle analysis (if available)

## 2. Automated Git Hooks

### Pre-commit Hook
Automatically runs when you `git commit`:
- TypeScript type checking
- ESLint on staged files
- Prettier formatting

### Pre-push Hook (for main branch)
Automatically runs when you `git push` to main:
- TypeScript check
- ESLint check
- Optional: Full test build (uncomment in `.husky/pre-push`)

## 3. Development Checklist

### Before Committing:
```bash
# 1. Run tests
npm run test-build

# 2. Check for TypeScript errors
npx tsc --noEmit

# 3. Run ESLint
npx next lint

# 4. Stage changes
git add .

# 5. Commit with descriptive message
git commit -m "feat: Add feature X with tests"
```

### Before Pushing to Main:
```bash
# 1. Pull latest changes
git pull origin main

# 2. Run full test build
npm run test-build

# 3. Push to GitHub
git push origin main
```

## 4. Common Build Issues & Solutions

### Module Not Found Errors
**Problem:** `Module not found: Can't resolve 'package-name'`
**Solution:** Install the missing package:
```bash
npm install package-name
```

### TypeScript Errors
**Problem:** Type errors after adding new code
**Solution:** Fix type definitions or add proper types

### ESLint Errors
**Problem:** Code style violations
**Solution:** Run auto-fix:
```bash
npx eslint --fix .
```

## 5. Vercel Deployment Pipeline

```
Local Code → Test Build → Git Commit → GitHub → Vercel Build → Live Site
      ↓           ↓           ↓           ↓          ↓           ↓
   Pass?       Pass?       Pass?       Push      Build?     Deploy?
    ✓           ✓           ✓           →         ✓          →
```

## 6. Critical Rules

### 🚨 NEVER PUSH WITHOUT LOCAL TEST BUILD
If the build fails locally, it will fail on Vercel.

### 🚨 FIX ONE ERROR AT A TIME
Don't try to fix multiple build errors simultaneously.

### 🚨 COMMIT OFTEN WITH DESCRIPTIVE MESSAGES
Small, focused commits are easier to debug.

### 🚨 TEST INCREMENTAL CHANGES
Make small changes, test, commit, repeat.

## 7. Quick Reference Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test-build   # Full test build (recommended before push)
npx tsc --noEmit     # TypeScript check only
npx next lint        # ESLint check only

# Git workflow
git add .            # Stage all changes
git commit -m "msg"  # Commit with message
git push origin main # Push to main branch
```

## 8. Emergency Fixes

### If Vercel Build Fails After Push:
1. **Check Vercel logs** for specific error
2. **Fix error locally**
3. **Test build locally** (`npm run test-build`)
4. **Commit fix**
5. **Push again**

### If Git Hooks Block Commit/Push:
```bash
# Skip hooks for emergency fix (use sparingly!)
git commit --no-verify -m "Emergency fix"
git push --no-verify
```

## 9. Best Practices

### For New Features:
1. Create feature branch
2. Implement feature
3. Test locally
4. Create pull request
5. Merge after review

### For Bug Fixes:
1. Reproduce bug locally
2. Write failing test (if applicable)
3. Fix bug
4. Test fix
5. Commit and push

### For Dependencies:
1. Check if package is needed
2. Install with `npm install package-name`
3. Update TypeScript types if needed
4. Test with new dependency
5. Update documentation

---

**Remember:** A successful local build = successful Vercel deployment. Always test before pushing! 🚀