# @ozdemircibaris/analytics-sdk

Lightweight JavaScript/TypeScript SDK for sending analytics events to your own analytics platform.

![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ozdemircibaris/analytics-sdk)
![npm version](https://img.shields.io/npm/v/@ozdemircibaris/analytics-sdk)
![license](https://img.shields.io/npm/l/@ozdemircibaris/analytics-sdk)

## ✨ Overview

A client-side analytics SDK that allows developers to send custom events to a remote analytics server using an API key. It is intended to be installed via NPM and initialized inside frontend applications.

## 🎯 Goals

- Allow developers to integrate analytics via a single `init()` function
- Automatically track basic metadata (timestamp, user agent, etc.)
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

// Initialize the SDK with your API key and endpoint
initAnalytics({
  apiKey: "your_project_api_key",
  endpoint: "https://api.yourdomain.com/track",
});

// Track an event
trackEvent("page_view", {
  path: window.location.pathname,
});
```

## 📦 Features

- **🔐 API key-based authentication** - Secure your analytics with API keys
- **📄 Custom event payloads** - Track any data that matters to you
- **🕒 Automatic metadata collection** - We capture timestamps, session IDs, and browser info
- **📤 Event batching** - Events are sent in batches to minimize network requests
- **🛡️ Error handling** - Built-in error handling and retry logic

## 📖 API Reference

### `initAnalytics(config)`

Initializes the analytics SDK with the provided configuration.

```typescript
initAnalytics({
  apiKey: "your_api_key", // Required: Your project's API key
  endpoint: "https://api.example.com/track", // Required: API endpoint to send events
  debug: false, // Optional: Enable debug logging (default: false)
  batchSize: 10, // Optional: Number of events to batch (default: 10)
  batchInterval: 5000, // Optional: Milliseconds between sends (default: 5000)
});
```

### `trackEvent(eventName, properties)`

Tracks an event with the given name and optional properties.

```typescript
trackEvent("signup_completed", {
  // Optional properties about the event
  method: "email",
  duration: 30,
  referrer: document.referrer,
});
```

## 🔄 Event Flow

1. You call `trackEvent()` in your application
2. The event is added to a queue
3. Events are automatically sent when:
   - The queue reaches the configured batch size
   - The configured batch interval is reached
4. If the request fails, events are re-added to the queue for retry

## 🚧 Roadmap

- **Offline queueing** - Store events in localStorage when offline
- **Retry with exponential backoff** - Smart retries for failed requests
- **Plugin architecture** - Extend functionality with plugins (e.g. auto-tracking)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

🧠 Notes

- This is part of a larger analytics platform that includes:

- A public-facing dashboard (Next.js)

- Project & API key management

Event visualizations per user

```

```
