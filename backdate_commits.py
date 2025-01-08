import os
import random
from datetime import datetime, timedelta
from git import Repo

# Configuration
REPO_PATH = os.getcwd()  # Automatically sets the current directory
COMMITS_PER_DAY = 2  # Number of commits per day
DAYS_BACK = 180  # How many days back to create commits

# Initialize the repo
repo = Repo(REPO_PATH)
start_date = datetime.now() - timedelta(days=DAYS_BACK)

for day in range(DAYS_BACK):
    commit_date = start_date + timedelta(days=day)
    for _ in range(COMMITS_PER_DAY):
        # Randomize time within the day
        commit_time = commit_date + timedelta(seconds=random.randint(0, 86400))
        formatted_time = commit_time.strftime("%Y-%m-%dT%H:%M:%S")

        # Create a dummy file
        file_name = f"dummy_file_{day}_{_}.txt"
        file_path = os.path.join(REPO_PATH, file_name)
        with open(file_path, "w") as f:
            f.write(f"Commit made on {formatted_time}")

        # Add the file to the repo
        repo.git.add(file_path)

        # Set environment variables for commit dates
        os.environ["GIT_AUTHOR_DATE"] = formatted_time
        os.environ["GIT_COMMITTER_DATE"] = formatted_time

        # Make the commit
        repo.index.commit(f"Backdated commit on {formatted_time}")

print("Backdated commits complete!")
