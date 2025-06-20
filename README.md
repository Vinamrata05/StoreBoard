# StoreBoard – Inventory Management Web Application

Project Overview: 
StoreBoard is a full-stack MERN (MongoDB, Express.js, React, Node.js) web application designed to efficiently manage store inventory. It allows users to add, view, and enquire about items with a clean and responsive UI. The system is designed to showcase CRUD capabilities with proper image handling, MongoDB integration, and basic email functionality, making it a robust and practical tool for inventory display and communication.

Key Features:
1. Add Item
	• Users can input item details including: Item Name, Type, Description, Cover Image, Additional Images
	• Images are uploaded using Multer, stored in a server-side uploads directory, and referenced via filenames.
	• Once added, items are stored in MongoDB, and the UI updates dynamically.

2. View Items
  • Items are displayed in a grid layout with cover image, item name.
  • On clicking an item, a modal popup appears with:
  	 o Enlarged images using a carousel
  	 o Description and type
     o Enquiry button to trigger an email
	
3. Email Enquiry Integration
	• Clicking the “Enquire” button sends an email (to a static receiver) using Nodemailer.
	• Email contains the item name and is sent using secure environment-based credentials (e.g., Gmail App Password).
  • All sensitive data like email credentials are managed via a .env file.
	
4. Responsive UI & Styling
	 • Designed with Tailwind CSS and custom styles for a modern aesthetic.
	 • Responsive layout ensures usability on mobile, tablet, and desktop.
	 • Font integration by Google Fonts.

