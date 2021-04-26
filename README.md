# InventoryManagementSystem

Before you start the app first time, make sure to import dependencies.
To import server dependencies, open terminal (command prompt) in the project's root directory and run:
`npm install`

To import server dependencies, run same command from the **_/client_** dir

To start the project, enter the next command in terminal:
`npm run dev`
It will run both backend and frontend servers in `127.0.0.1:5000` and `127.0.0.1:3000` respectively.


### Flow
When starting to work on a particular feature, create a new branch and call it **feature/short_feature_description**, then make all changes in that branch.
Under any circumstances, do NOT develop under "main" branch as it may lead to unexpected bugs!

To avoid conflicts in code, you should always sync with main branch. To do that, make sure to frequently run `git pull origin main`. Make it your habit!
So if the task is to create a login page, just create a new branch and call it _feature/login_form_ and work there.

Make changes in the code and run `git add ` followed by the file name or directory that you modified, then enter `git commit -m "some message describing the change"`.
Do so until the feature is completed and run `git push origin <your branch name>` - as in case with login, it would be - `git push origin feature/login_form`.

You should see a link for a pull request (PR) in the terminal. Open it in browser, add description to the pull request and enter _create pull request_. After that copy the link of the PR and paste it in Asana ticket, then assign to one of the developers for review.
