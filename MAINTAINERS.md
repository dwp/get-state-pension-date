# Maintainers

## CI configuration

Required CI variables:

| Variable | Description |
|----------|-------------|
| `PROJECT_BOT_TOKEN` | Project Access Token |
| `PROJECT_BOT_USER` | Name of the bot user associated with the Project Access Token (i.e. `project_<projectId>_bot` |

## Publishing releases to the npm registry

Tagging and publishing is handled by the CI pipeline. To create a release, follow these steps:

* Create and checkout a new branch off `master`, called `chore/release`
* Run `npx standard-version`
* Push that branch up to the remote
* Open a new MR to have that branch reviewed
* Once approved, merge that MR into `master`

At this point the tagging and publishing process should begin automatically.
