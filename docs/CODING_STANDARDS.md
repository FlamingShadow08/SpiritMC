# Spirit Coding Standards

## 1. Purpose

This document defines the coding standards and development principles followed throughout the Spirit project.

These standards aim to keep the codebase readable, maintainable, modular, and consistent across the Launcher and Client.

The primary principle is:

> Main code should describe what happens, not how it happens.

Implementation details should be encapsulated in appropriately named functions and modules.

## 2. Code Readability

- Code must be easy to read and understand.
- Prefer descriptive names over short or ambiguous names.
- Keep main application logic clean and focused on the sequence of operations.
- Avoid unnecessary complexity and deeply nested logic.
- Separate logically independent blocks of code with blank lines.
- Follow consistent formatting throughout the project.

Code should communicate its intent without requiring developers to inspect every implementation detail.

## 3. Function-Oriented Development

Functions are the primary way of organizing and encapsulating application behavior.

### 3.1. Function Extraction

Move meaningful operations into independent functions, even when they are only used once.

A function should be extracted when it:

- Represents a meaningful operation.
- Contains multiple steps that belong together.
- Has an independent responsibility.
- May be reused elsewhere.
- Hides implementation details that would otherwise make the main code harder to read.
- Represents behavior that may need to change independently.

However, do not create functions for every individual statement or trivial expression.

Simple assignments, conditions, expressions, and straightforward function calls can remain directly in the main code when they are already clear.

### 3.2. Function Naming

Function names must clearly describe the action they perform.

Prefer descriptive, action-oriented names such as:

- `openSettingsPage()`
- `loadUserSettings()`
- `saveUserSettings()`
- `playNavigationSound()`
- `playPageTransitionAnimation()`
- `updatePlayerInformation()`

Avoid vague or ambiguous names such as:

- `doSomething()`
- `handleThing()`
- `openPage1()`
- `processData()`

Function names should make their purpose understandable without requiring developers to read their implementation.

### 3.3. Single Responsibility

Each function should have a clearly defined responsibility.

A function may coordinate multiple related operations when they collectively represent one higher-level action.

For example, opening a page may involve:

1. Playing navigation feedback.
2. Running a transition animation.
3. Changing the current page.

These operations can be coordinated by a single higher-level function:

`openSettingsPage()`

The implementation details should remain encapsulated in their respective functions.

### 3.4. Reusability and DRY

Avoid duplicating the same implementation in multiple places.

If multiple parts of the application require the same behavior, centralize that behavior in an appropriate function or module.

Functions should be reusable without introducing unnecessary dependencies or complexity.

### 3.5. Function Variations

When an operation has multiple variations, avoid duplicating its core implementation.

Use one of the following approaches depending on the situation:

- Create clearly named wrapper functions for a small number of well-defined variations.
- Use optional parameters or configuration objects when an operation has multiple customizable behaviors.
- Keep the core implementation independent from optional behavior whenever practical.

For example, different navigation behaviors should reuse the same underlying page-changing logic rather than implementing navigation multiple times.

## 4. Functions Directory

Function implementations should be organized in dedicated `functions` directories.

Avoid placing large amounts of implementation logic directly inside UI components or unrelated modules.

Organize functions by their related features or responsibilities as the project grows.

For example:

```text
src/
├── components/
├── functions/
│   ├── navigation/
│   ├── audio/
│   ├── animation/
│   └── settings/
├── settings/
├── types/
└── ...
```

This is an illustrative structure, not a requirement to create every directory immediately.

Do not place every function in one large file. Keep related functions together while maintaining clear boundaries between responsibilities.

Each programming language and application should have its own appropriate function modules. Shared logic should only be extracted into shared packages when it is genuinely reusable and compatible.

## 5. Separation of Concerns

Keep different responsibilities separated.

Examples include:

- UI components: rendering and user interaction.
- Navigation functions: page changes and navigation behavior.
- Audio functions: sound playback and audio control.
- Animation functions: animation behavior.
- Settings functions: loading, updating, validating, and saving settings.
- Application logic: coordinating higher-level operations.

A component should not need to know the implementation details of every operation it triggers.

For example, a settings button should call `openSettingsPage()` rather than implementing navigation, sound playback, and animation directly.

## 6. Centralized Settings Management

Application settings must be managed through a centralized settings system.

Settings should be stored in JSON files rather than being scattered throughout the application as hardcoded values.

### 6.1. Setting Values

Use appropriate data types for different settings:

- Boolean values for enabled/disabled options.
- Strings for named options such as themes, languages, and display modes.
- Numbers for numerical values such as volume levels and interface scaling.

Prefer descriptive string values over numeric identifiers when they make settings easier to understand and maintain.

If numeric values are necessary, document their meaning clearly.

### 6.2. Settings Access

Application code should access settings through the centralized settings system.

Individual features should not independently read and write the settings file.

The settings system should provide functions for operations such as:

- Loading settings.
- Updating settings.
- Saving settings.
- Retrieving default values.
- Validating loaded values.

### 6.3. Settings-Dependent Behavior

Functions must respect the relevant user settings before executing optional behavior.

For example:

```ts
export function openSettingsPage() {
    if (settings.navigationSoundEnabled) {
        playNavigationSound();
    }

    if (settings.pageTransitionEnabled) {
        playPageTransitionAnimation();
    }

    changeCurrentPage("settings");
}
```

This allows application behavior to be controlled by user preferences without duplicating settings checks throughout the UI.

### 6.4. Default Values and Validation

The application must have valid default settings.

Missing, incomplete, or invalid settings must not prevent the application from starting normally.

Loaded settings should be validated before being used.

Changes to the settings structure should be handled carefully to preserve compatibility with existing user configurations.

## 7. Launcher and Client Consistency

The Launcher and Client should follow the same general coding standards.

Both applications should maintain consistent principles for:

- Function organization.
- Naming conventions.
- Code readability.
- Separation of responsibilities.
- Settings management.
- Error handling.
- Code formatting.

However, consistency does not mean forcing identical implementations where the underlying technologies or application requirements differ.

Each application should maintain its own appropriate modules and dependencies.

Shared functionality should be centralized only when it makes architectural sense.

## 8. Code Comments

Comments should explain information that is not immediately obvious from the code itself.

Use comments to document:

- Non-obvious implementation decisions.
- Important constraints or assumptions.
- Numeric identifiers when their meanings are not self-explanatory.
- Complex behavior that cannot be adequately communicated through naming alone.

Avoid comments that simply repeat what the code already says.

Function and variable names should carry most of the explanatory responsibility.

## 9. Formatting and Consistency

- Use consistent indentation.
- Separate logical blocks with blank lines.
- Keep naming conventions consistent within each language.
- Use the project's configured formatting and linting tools.
- Avoid unnecessary formatting differences between files.
- Keep imports organized and remove unused imports.

Automated formatting and linting tools should be used wherever appropriate.

## 10. General Development Principles

All development should follow these principles:

1. Readability over unnecessary cleverness.
2. Reusability without overengineering.
3. Clear responsibilities for functions and modules.
4. Minimal duplication of logic.
5. Centralized management of shared application behavior.
6. Consistent coding practices across the project.
7. Maintainability and extensibility over short-term convenience.

These standards should evolve when the project introduces new requirements or when practical experience reveals a better approach.

The objective is not to impose unnecessary restrictions, but to maintain a codebase that remains understandable and manageable as Spirit grows.