# Git Manual

> If you've never touched git/github or just need a brief reinforcement of what you know, a great way to start is with the open-source game [Oh My Git!](https://ohmygit.org/).

Best practices suggest that the changes to be implemented are made in an alternate branch to the base branch, and that when the implementation is complete and functionality is verified, they are incorporated by means of a merge via a pull request to the development branch. And, once the merge is done, the branch in which the changes were made is deleted.

## How to modify or add functionality to the project?

From the git terminal, github desktop app, a bash terminal, the repository page, or another familiar interface, pull up the branch from either the base development branch (main) or another one.

This branch starts out as a carbon copy (identical) of the original branch.
Develop the new functionality, making representative commits using the points in the next section. Verify that you are making modifications to the branch you generated.

When the development of the functionality is finished, from the same interface generate a Pull Request to the base branch from which you raised the current branch in which you have worked.

You'll be required to assign two or more collaborators to review and approve your Request, where they'll be able to see the name and description of the Request, and each of the commits made.

Once the merge is done, delete the branch where you deployed your changes and repeat the process.

# How should a commit be made?

Make a commit per component change.
The name of the commit should briefly and concisely summarize the changes made. But if you need to describe in more detail what you have done, occupy the commit description section.

The commit is to be set along with any others you might have made for review in a Pull Request.

In the situation of a merge conflict, notify your cell leader or a Project Manager.

# Assesing Merge Conflicts

Review the conflict in detail and ask yourself for each change if you want to leave the version of:
<Incoming> refers to the changes made in the branch that you want to incorporate into another branch.
<Current> refers to the state of the documents/variables/values in the original branch that you want to merge to.

If you have questions check the documentation, there are also resources on sites like YouTube that can help you understand Git version control. But personally, one of the best resources available is the free game “Oh My Git!”. You can also check out this handy [Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/).

← [Manuals](https://github.com/SFMBa01029956/TC3005B.502/tree/manuals)

← [Home](https://github.com/SFMBa01029956/TC3005B.502)
