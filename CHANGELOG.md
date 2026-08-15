# Changelog

## [0.1.2] - 2026-08-14

### Fixed
- The `extractFile()` and `extractDir()` methods from the `SlashService` and `EventService` services are no longer limited to `.js` files. Files with other extensions, such as `.ts`, `.cts`, `.cjs`, and similar formats, are now supported.
- Fixed a bug in `SlashService.extractDir()` that occurred when the optional second configuration parameter was not provided, which could cause the application to stop responding correctly to the `InteractionCreate` event.
- Fixed an issue with `Application.slash.listening` where its state was not correctly updated to `true`.
- Fixed an issue between `Application.slash.listen()` and `Application.slash.deployGlobal()` that prevented new commands from being registered after the listener had already started.

```js
app.client.once(Events.ClientReady, async () => {
    console.log("Online");

    await app.slash.deployGlobal(commands.valid);

    app.slash.listen();

    // New commands can now be registered
    // even after the listener has started.
    await app.slash.deployGlobal(gamesCommands.valid);
});
```

- Fixed error handling for deferred interactions in `Application.slash.listen()`.
- Fixed security-related issues during command deployment.
- `Application.slash.listen()` can now only be called once while the listener is active. It can be called again after `Application.slash.close()` is executed.
- Improved several error messages.
- Fixed various minor issues found during internal code review.

### Improved
- The `Dfx2Djs` adapter received minor optimizations.
- Internal improvements were made to increase framework security and stability.
- Documentation, README files, texts, and examples were reviewed and corrected.
- Internal code was reviewed and simplified in several areas.

## [0.1.1] - 2026-06-18

### Fixed

Fixed event listener bugs in the EventService, as well as other issues from the previous version.

### Github

Added practical usage examples in separate files, available in the `/prototypes` directory.

[Disfox Github examples](https://github.com/DisfoxJS/Disfox/tree/main/prototypes)

## [0.1.0] - 2026-06-18

### Added

#### New Tool: BehaviorTable
We are introducing a new tool designed to automate Slash Command behaviors. Behavior Tables are collections of rules and configurations that can be applied to one or more slash commands to define how they interact with specific users, IDs, and execution contexts.

* [Learn more about Disfox BehaviorTables](https://disfox.js.org/docs/disfox/0.1.0/en/Modules/BehaviorTables)

This tool brings greater simplicity and intelligent automation to your codebase. BehaviorTables is currently in active development, and we plan to introduce additional features to expand its capabilities in future updates.

### Updated

#### SlashService
Command extraction via `SlashService.extractDir()` has been optimized and now accepts extraction option parameters.

#### Optimizations
Various internal optimizations have been implemented to ensure high performance and low overhead.

#### Error Handling & Architecture
Enhanced the `DisfoxError` class to provide better organization and more detailed error reporting.

### Removed

#### Deprecated Features
Legacy and deprecated code paths have been officially discontinued and removed from the framework.

## [0.0.8] - 2026-04-20

### Fixed
- Fixed 0.0.7 bugs

---

## [0.0.7] - 2026-04-19

### Releases

#### New Disfox Model
We are introducing a **new model for structuring application systems**, called the **Disfox Model**.  
> It is based on a Component-Based Architecture, focusing on reusable and modular components.

#### New Structure: SlashCommands
Slash commands can now be organized in a more structured and modular way.  
We’ve also introduced new concepts like *marks/tags* to improve how commands are defined and managed.

You can check the full documentation for **SlashService Command** and the **Disfox Model** here:  
https://disfox.netlify.app/doc?doc=SlashService#topic-6

#### Internal Optimizations
Several internal improvements have been made, resulting in better performance and overall efficiency.

#### Official Documentation
Disfox now has its own official documentation website, available at:  
https://disfox.netlify.app

---

## [0.0.6] - 2026-04-12

### Fixed
- Fixed bugs when deploying and listening **Slash Commands**.

---

## [0.0.5-c] - 2026-03-13

### Fixed
- Fixed unwanted debug logs.

---

## [0.0.5-b] - 2026-03-12

### Fixed
- Fixed extraction bugs in **SlashService**.
- Fixed extraction bugs in **EventService**.
- Fixed bugs when deploying **Slash Commands**.

---

## [0.0.5] - 2026-03-11

### Updated

#### Application
- **New method `Application.connect()`**  
  Logs the client in and starts the application's **WebSocket server**.

- **Deprecated `slashCommands.listenCommands()`**  
  This method is deprecated and may be removed in future releases.

- **New method `slashCommands.listen()`**  
  Listens for **Slash Command interactions** with improved control and precision.  
  Documentation and examples available on GitHub:  
  https://github.com/FluxoArts/Disfox

- **New `Application.events` class**  
  Provides access to the application's **event system**.  
  Documentation and examples available on GitHub:  
  https://github.com/FluxoArts/Disfox

- **New method `events.listenEvents()`**  
  Allows listening to **Discord events** through the application event system.

- **New methods for `Application.actions`:**  
  - `.getAvatar()`  
  - `.getAvatarUrl()`

### SlashService
- **Deprecated:** `SlashService.extractSlashCommands()`  
- **New methods:**  
  - `SlashService.extractFile()`  
  - `SlashService.extractDir()`

### Added

#### EventService
- Introduced a service for handling **Discord events**.  
- Structured event extraction ensures **valid and well-organized event data**.  
- Documentation and examples available on GitHub:  
  https://github.com/FluxoArts/Disfox

#### DisfoxError (Internal)
- Internal error class still in testing phase.

Disfox is now available on GitHub with **documentation, examples, and TypeScript source code**:  
https://github.com/FluxoArts/Disfox

---

## [0.0.4] - 2026-02-27

### Fixed
- Fixed minor bugs from the previous release.

---

## [0.0.3] - 2026-02-26

### Added

#### SlashService
- Introduced a service for managing **Slash Commands**, including **command extraction** and other planned features.

### Updated

#### Application
- Added a new object for managing **application Slash Commands**.
- Added methods to **register global commands** and **register commands for specific guilds**.
- Added a method to **listen for Slash Command interactions**.