# How to Update Content on Ruchitha Associates Website

Welcome! This website is designed so that you can add new **Jobs**, **Courses**, and **News** without writing any complex code. 

All of this data is stored in the `content` folder as simple text files (called JSON files). When you add a new file here, the website automatically creates a new page for it!

---

## 📋 How to Add a New Job

1. Go to the `content/jobs` folder.
2. Create a new file. Give it a simple name with `.json` at the end (for example, `sales-manager.json`). **Important: Use lowercase letters and hyphens (-) instead of spaces.**
3. Copy and paste this template into the file, then fill in your details:

```json
{
  "title": "Sales Manager",
  "sector": "Sales & Marketing",
  "location": "Hyderabad, Telangana",
  "experience": "2 - 5 Years",
  "salary": "₹3,50,000 - ₹5,000,000 P.A.",
  "description": "Write your detailed job description here...",
  "requirements": [
    "Requirement 1",
    "Requirement 2",
    "Requirement 3"
  ],
  "postedDate": "2023-11-05T10:00:00Z"
}
```
*Note: Make sure to keep the quote marks `"` around your text!*

---

## 🎓 How to Add a New Course

1. Go to the `content/courses` folder.
2. Create a new file (e.g., `web-development.json`).
3. Copy and paste this template:

```json
{
  "title": "Web Development Basics",
  "category": "IT & Software",
  "duration": "6 Months",
  "eligibility": "Graduation",
  "fee": "Free under government scheme",
  "description": "Write a short summary of the course here...",
  "modules": [
    "Module 1: HTML & CSS",
    "Module 2: JavaScript",
    "Module 3: Soft Skills"
  ],
  "image": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
}
```

---

## 📰 How to Add a New News Article

1. Go to the `content/news` folder.
2. Create a new file (e.g., `new-office-opening.json`).
3. Copy and paste this template:

```json
{
  "title": "We are opening a new office!",
  "category": "Announcements",
  "date": "2023-11-10T09:00:00Z",
  "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  "excerpt": "A short summary of the news goes here (1-2 sentences).",
  "content": "The full, detailed news article goes here. You can write as much as you want.\n\nUse '\\n\\n' to create new paragraphs."
}
```

---

## 🖼️ Important Note on Images
Currently, the images in the JSON files must be web links (URLs). If you have a photo on your computer, you can upload it to the `public/` folder in this project, and then reference it like this: `"/my-photo.jpg"`.

If you have any questions, you can always ask your developer!
