# Contributing Guide

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Install dependencies: `npm install`
5. Start development server: `npm run dev`

## Code Standards

### TypeScript

- Always use TypeScript
- Define interfaces for props and data
- Avoid `any` type
- Use strict mode

### Code Style

- Follow ESLint rules
- Use Prettier for formatting
- 2-space indentation
- Single quotes for strings
- Trailing commas

### Running Linters

```bash
# Check for linting errors
npm run lint

# Check TypeScript
npm run type-check

# Fix formatting issues
npm run lint -- --fix
```

## Component Development

### Creating a New Component

```typescript
'use client';

import { ReactNode } from 'react';

interface MyComponentProps {
  title: string;
  children?: ReactNode;
}

export default function MyComponent({
  title,
  children,
}: MyComponentProps) {
  return <div className="p-4">{children}</div>;
}
```

### Component Best Practices

- Use functional components with hooks
- Keep components small and focused
- Extract logic into custom hooks
- Use proper TypeScript types
- Add error boundaries for error handling
- Implement proper accessibility (a11y)

## Testing

### Write Tests

```typescript
// __tests__/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders heading', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Run Tests

```bash
npm test
```

## Git Workflow

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Make your changes
3. Commit with clear messages: `git commit -m "Add feature description"`
4. Push to your fork: `git push origin feature/feature-name`
5. Open a Pull Request with description
6. Address review comments
7. Merge after approval

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

Example:
```
feat: add product filtering

Implement faceted search on products page
with support for categories and price ranges.

Closes #123
```

## Pull Request Process

1. Update `README.md` with relevant changes
2. Ensure all tests pass: `npm test`
3. Run linting: `npm run lint`
4. Run type checking: `npm run type-check`
5. Fill out PR template completely
6. Request review from maintainers

## Documentation

- Update relevant docs for new features
- Keep API documentation current
- Add JSDoc comments to functions
- Include examples for complex features

## Performance

When contributing:
- Minimize bundle size impact
- Use lazy loading for heavy components
- Optimize images
- Avoid unnecessary re-renders
- Use proper caching strategies

## Security

- Never commit secrets or API keys
- Use environment variables for sensitive data
- Validate user input
- Escape HTML content
- Follow OWASP guidelines

## Issues

### Reporting Bugs

1. Use the bug report template
2. Include reproduction steps
3. Provide expected vs actual behavior
4. Include browser/environment info
5. Add screenshots if relevant

### Feature Requests

1. Use the feature request template
2. Explain the use case
3. Provide examples if possible
4. Discuss potential implementation

## Code Review

Reviewers will check:
- Code quality and style
- Test coverage
- Documentation
- Performance impact
- Security implications

## Questions?

Open a discussion or issue for help!
