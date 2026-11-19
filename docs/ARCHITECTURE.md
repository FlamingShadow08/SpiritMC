# Spirit Architecture

## 1. Overview

Spirit is a modular Minecraft software ecosystem consisting of multiple applications, supporting tools, and shared services.

The project is designed to evolve over time while maintaining a consistent architecture, clear separation of responsibilities, and maintainable code.

The main components are:

- **Spirit Launcher:** The desktop application responsible for launching and managing Minecraft installations.
- **Spirit Client:** The Minecraft client-side component and its associated features.
- **Supporting Tools and Services:** Additional functionality that extends the Spirit ecosystem.

The architecture is intended to support long-term development without unnecessarily coupling independent components.

## 2. Repository Structure

Spirit uses a monorepo structure.

Each major application has its own directory, while project-wide documentation and shared resources remain at the repository root.

```text
SpiritMC/
├── apps/
│   ├── launcher/
│   └── client/
├── packages/
├── docs/
├── .github/
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE.md
└── README.md
```

The `packages` directory is reserved for functionality that is genuinely shared between multiple applications. It should only be populated when such functionality is identified.

## 3. Spirit Launcher

The Launcher is a desktop application built using:

- React
- TypeScript
- Tauri 2
- Rust

### 3.1. Frontend

The frontend is responsible for:

- User interface rendering.
- User interaction.
- Application navigation.
- Interface animations and audio feedback.
- Managing frontend application state.
- Coordinating frontend operations.

React and TypeScript are used to maintain a modular and maintainable interface.

### 3.2. Backend

The Rust backend is responsible for operations that require native application capabilities.

The frontend and backend communicate through Tauri's command and event mechanisms.

Backend responsibilities will be defined as development progresses.

## 4. Spirit Client

Spirit Client is a separate major component of the Spirit ecosystem.

Its internal architecture, technology choices, runtime integration, and Minecraft compatibility strategy will be determined during its development.

The Client should follow the same general coding standards as the Launcher while maintaining an architecture appropriate for its own technical requirements.

The Client and Launcher should remain independently maintainable.

## 5. Function Organization

Function-oriented development is a fundamental principle throughout Spirit.

Each application and programming language should organize its functions into appropriate modules.

For example, the Launcher may contain separate function modules for:

- Navigation.
- Audio.
- Animations.
- Settings.
- Application management.

The Rust backend should maintain its own appropriate function and module structure.

Shared implementations should be placed in shared packages only when they are genuinely reusable and compatible with the applications that depend on them.

See `CODING_STANDARDS.md` for detailed function organization and implementation rules.

## 6. Settings Architecture

Application settings must be centrally managed.

Settings should be stored in JSON format and accessed through a dedicated settings management system.

The system should support:

- Loading settings.
- Updating settings.
- Saving settings.
- Default values.
- Validation and compatibility handling.

Settings should be logically separated by application and responsibility.

Launcher-specific settings and Client-specific settings should remain independent where their behavior differs.

## 7. Shared Functionality

Shared functionality should be introduced when multiple components genuinely require the same implementation.

Potential shared functionality may include:

- Common data structures.
- Shared configuration formats.
- Common utilities.
- Communication interfaces.
- Shared application services.

The existence of two applications does not automatically justify sharing their implementation.

Avoid unnecessary dependencies between independent components.

## 8. Minecraft Version Compatibility

Minecraft version compatibility is an important architectural consideration.

Version-dependent implementations should be isolated from stable application logic wherever practical.

Adapters or compatibility modules may be introduced to handle differences between Minecraft versions.

The exact compatibility architecture will be determined when the Client and its Minecraft integration are implemented.

Version compatibility must be verified through appropriate testing rather than assumed.

## 9. Architecture Principles

The Spirit ecosystem should follow these principles:

1. Modularity: Keep independent features and components separated.
2. Maintainability: Make future changes possible without unnecessary modifications to unrelated components.
3. Reusability: Avoid duplicating genuinely shared functionality.
4. Separation of Concerns: Give each module a clear responsibility.
5. Extensibility: Allow new features and components to be introduced without redesigning the entire system.
6. Independence: Keep the Launcher and Client independently maintainable.
7. Consistency: Follow common coding standards across the ecosystem.

## 10. Evolution of the Architecture

This document describes the initial architecture of Spirit.

Not every future component or technical decision needs to be defined in advance.

Architectural decisions should be documented as the project develops, based on actual requirements and practical experience.

Changes to this document should reflect deliberate architectural decisions rather than speculative future requirements.