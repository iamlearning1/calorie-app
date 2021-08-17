# Simple Calorie Tracking App

## How to start the project
1. Project contains of two folders, api and client.
2. You have to go inside each folder and run `npm install`.
3. Create `.env` file in api folder.
4. Create `.env.local` file in client folder.
5. Then run `npm run dev` in both projects.
6. Go to `http://localhost:3000` in the browser to start exploring.
7. The `npm` and `node` version is mentioned in the package.json files for both projects.
8. Api runs on `http://localhost:5000/api`.

### Env Variables

### api
`MONGO_DB_URL=mongodb+srv://calories:lvc7EOUGcn3S7XxW@cluster0.n91xu.mongodb.net/calories?retryWrites=true&w=majority`

### client
`NEXT_PUBLIC_BASE_URL=http://localhost:5000/api`

### users
normal = deepak@test.com
password = 12345678

admin = admin@test.com
password = 12345678

> Calorie limit can be update in the database in users collection
> in the `calorieLimit` field.