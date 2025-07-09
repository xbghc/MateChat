In JavaScript, formatting time can be achieved in multiple ways, including using native `Date` object methods, using the internationalization API (`Intl` object), or using third-party libraries. Here are some common methods:

### 1. Using Native JavaScript

#### Basic Formatting

```javascript
const now = new Date();

// Get year, month, day, hour, minute, second
const year = now.getFullYear();
const month = now.getMonth() + 1; // Month starts from 0
const day = now.getDate();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

console.log(formattedTime);
```

#### Using `Date` Object Methods

```javascript
const now = new Date();

// toLocaleString() method can format date and time according to local format
const formattedTime = now.toLocaleString();

console.log(formattedTime);
```

These methods can help you format time according to different requirements. Which method to choose depends on your specific needs and project environment.