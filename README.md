# @ozdemircibaris/analytics-sdk

Lightweight JavaScript/TypeScript SDK for sending analytics events to your own analytics platform.

![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ozdemircibaris/analytics-sdk)
![npm version](https://img.shields.io/npm/v/@ozdemircibaris/analytics-sdk)
![license](https://img.shields.io/npm/l/@ozdemircibaris/analytics-sdk)

## ✨ Overview

A client-side analytics SDK that allows developers to send custom events to a remote analytics server using authentication credentials. It is intended to be installed via NPM and initialized inside frontend applications.

## 🎯 Goals

- Allow developers to integrate analytics via a single `init()` function
- Automatically track basic metadata (timestamp, browser, device, etc.)
- Send batched events to a custom backend endpoint
- Be lightweight, fast, and production-safe
- Handle offline/queued events gracefully (coming soon)

## 🔧 Installation

```bash
npm install @ozdemircibaris/analytics-sdk
# or
yarn add @ozdemircibaris/analytics-sdk
```

## 🚀 Quick Start

```javascript
import { initAnalytics, trackEvent } from "@ozdemircibaris/analytics-sdk";

// Initialize the SDK with authentication credentials
initAnalytics({
  apiKey: "your_api_key",
  clientId: "your_client_id",
  clientSecret: "your_client_secret",
});

// Track an event
trackEvent("page_view", {
  path: window.location.pathname,
});
```

## 📦 Features

- **🔐 Multi-layer authentication** - Secure your analytics with API keys, client IDs, and secrets
- **📄 Custom event payloads** - Track any data that matters to you
- **🕒 Automatic metadata collection** - We capture timestamps, browser, device, and session info
- **📤 Event batching** - Events are collected in batches but sent individually
- **🛡️ Error handling** - Built-in error handling and retry logic

## 📖 API Reference

### `initAnalytics(config)`

Initializes the analytics SDK with the provided configuration.

```typescript
initAnalytics({
  apiKey: "your_api_key", // Required: Your project's API key
  clientId: "your_client_id", // Required: Your client ID
  clientSecret: "your_client_secret", // Required: Your client secret
  debug: false, // Optional: Enable debug logging (default: false)
  batchSize: 10, // Optional: Number of events to batch (default: 10)
  batchInterval: 5000, // Optional: Milliseconds between sends (default: 5000)
});
```

### `identifyUser(userData)`

Identifies a user with the provided user data. All subsequent events will automatically be associated with this user.

```typescript
identifyUser({
  id: "user-123", // Required: User's unique identifier
  name: "John Doe", // Optional: User's name (explicitly supported)
  email: "john@example.com", // Optional: User's email (explicitly supported)
  plan: "premium", // Optional: Any additional custom properties
  signupDate: 1623412800000, // Optional: Any additional custom properties
});
```

### `trackEvent(eventType, eventData)`

Tracks an event with the given type and optional data.

```typescript
trackEvent("signup_completed", {
  // Optional data about the event
  method: "email",
  duration: 30,
  referrer: document.referrer,
});
```

## 🔄 Event Structure

Events are sent to your backend with the following structure:

```typescript
{
  type: string; // Event type (e.g., 'page_view', 'button_click')
  data: object; // Event data/properties object
  url: string; // Current page URL
  browser: string; // Browser name (e.g., 'Chrome', 'Firefox')
  device: string; // Device type (e.g., 'Windows', 'iOS', 'Android')
  user?: { // Optional user data if identifyUser() was called
    id: string; // User's unique identifier
    name?: string; // Optional user's name
    email?: string; // Optional user's email
    [key: string]; // Any additional user properties
  }
}
```

The SDK internally also tracks:

- `sessionId`: Unique ID for the current session
- `timestamp`: Unix timestamp in milliseconds

## 🔄 Event Flow

1. You call `trackEvent()` in your application
2. The event is added to a queue
3. Events are processed when:
   - The queue reaches the configured batch size
   - The configured batch interval is reached
4. Each event is sent individually to the API endpoint
5. Failed events are re-added to the queue for retry

## 🚧 Roadmap

- **Offline queueing** - Store events in localStorage when offline
- **Retry with exponential backoff** - Smart retries for failed requests
- **Plugin architecture** - Extend functionality with plugins (e.g. auto-tracking)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
