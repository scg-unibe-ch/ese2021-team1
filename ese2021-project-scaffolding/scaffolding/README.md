## Team 1: ESE 2021 Project Requirements (Checklist & Bugs)

- For Tasks see: https://github.com/scg-unibe-ch/ese2021-team1/projects/1
- Intra-Team communication: WhatsApp and Discord.
- Communication with tutor: Email & Google Meet.

#### Important ❗❗❗

- Please mark all finished to dos and add your name!
- Add your name on the pending to dos you are working on to avoid double work!
- Add Bugs to 'BUGS' and document your progress and problems IN HERE only!
- ALL non **_Optional_** to dos must be finished by 14. December 23:59:00!
- GO!

### Milestone 1: Learn Technologies + Implement Authentication 🔑

##### ToDos 📝

- [x] Admin: (no front end options, hardcoded in the backend): <br> - username: admin <br>- password: Admin123!
- [x] Fans: Registration and Login functionality. Form feedback and data validation.
- [x] **_Optional_**: Profile page: change data, password.
- [x] Reset password.

### Milestone 2: Community Feed/Wall Posts 📬

##### ToDos 📝

- [x] Admin: can update and remove but not create posts.
- [x] Create post component: Title, Image, etc. Title MUST be set. Category must be set.
- [x] CRUD for posts.
- [x] Upvote and Downvote posts and ranking of post.
- [ ] Loading posts can be infinite scrolling, pagination or Load More. [ARIS - WORK IN PROGRESS]
- [x] Create post categories (for post creation and wall display)
- [x] **_Optional_**: Fans can comment on posts.
- [ ] **_Optional_**: User Profile Page shows their uploads and upvotes. (working on it - Alessio)
- [x] **_Optional_**: Image Upload to Server/Backend.
- [ ] Add feedback when reporting post.
- [ ] Better design for filter.

### Milestone 3: Fan-Shop 🛒

##### ToDos 📝

- [x] Create Product component: Title, Image, Description, Price, Category.
- [x] Create Store and add product functionality
- [x] Admin: can CRUDE products
- [x] Fans: cannot post products, but can buy stuff from the store.
- [x] Create Purchase Process: <br> - Add to Cart<br> - Checkout<br> - Payment<br>
- [x] **_Optional_**: Search/Filter products on Store
- [x] **_Optional_**: Shopping cart for fans to purchase multiple items at once/ display sum.
- [ ] **_Optional_**: Product Review and Payment services using Stripe or PayPal. (working on it - Alessio)
- [ ] save cart in backend.
- [ ] mark orders as shipped (for admin).
- [ ] better design for filter
- [ ] display my orders in profile page (for user) [ARIS - WORK IN PROGRESS]
- [ ] display all orders (for admin)
- [ ] cancel orders in profile page (for user)
- [ ] mark orders as shipped (for admin)

### Milestone 4: Finishing Touches 💎

##### ToDos 📝

- [x] Finish any not optional open tasks!
- [ ] Work on Design, UI and aesthetics.
- [ ] **_Optional_**: Admins can reset reporting counter or delete post based on reports.
- [ ] Frontend-testing
- [ ] Backend-testing
### BUGS 🐞

- [x] Reset - does page reload the whole page.
- [x] When creating second account, login does not work.
- [x] Likes: If upvoted/downvoted then downvote/upvote, you get an error.
- [x] On Backend start (start or ctr+S), database initializes empty tables and overwrites everything - check if table exists, if not then init tables.
- [ ] errors for detail product (cannot read properties of undefined).
