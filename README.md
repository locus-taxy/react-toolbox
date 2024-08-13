# fe-external-packages
This repository accumulation of all the external packages used in the Frontend Dashboard.

## Packages
| # | packages               | locus repo url                                                         |
|---|------------------------|------------------------------------------------------------------------|
| 1 | google-map-react       | https://github.com/locus-taxy/google-map-react/tree/locus-master       |
| 2 | fixed-data-table-2     | https://github.com/locus-taxy/fixed-data-table-2/tree/locus-master     |
| 3 | react-automata         | https://github.com/locus-taxy/react-automata/tree/locus-master         |
| 4 | react-big-calendar     | https://github.com/locus-taxy/react-big-calendar/tree/locus-master     |
| 5 | react-css-themr-legacy | https://github.com/locus-taxy/react-css-themr-legacy/tree/locus-master |
| 6 | react-grid-layout      | https://github.com/locus-taxy/react-grid-layout/tree/locus-master      |
| 7 | react-popover          | https://github.com/locus-taxy/react-popover/tree/locus-master          |
| 8 | react-toolbox          | https://github.com/locus-taxy/react-toolbox/tree/locus-master          |

## How to add a new package
We are using git-subtree to manage the external packages. To add a new package, you can use the following command:

### 1. Add the Subtree
```bash
git remote add -f <subtree-name> <subtree-repository-url>
```

- <subtree-name>: A name for the remote repository you're adding.
- <subtree-repository-url>: The URL of the Git repository you want to add

### 2. Fetch the Subtree
```bash
git subtree add --prefix=packages/<subtree-name> <subtree-name> <branch> --squash
```

- `packages/<subtree-name>` The directory where you want to place the subtree content.
- `<subtree-name>`: The name you gave to the remote repository in step 1.
- `<branch>`: The branch of the remote repository you want to include.
- `--squash`: This option merges the subtree's history into a single commit, making the history cleaner.

### 3. Working with the Subtree
After adding the subtree, you can work with it as if it were a regular repository. You can make changes, commit them, and push them back to the remote repository.

### 4. Pulling Changes from the Subtree
```bash
git subtree pull --prefix=packages/<subtree-name> <subtree-name> <branch> --squash
```

> TIP: If the pull fails with conflicts, you can use Github Desktop to resolve them easily.

### 5. Pushing Changes to the Subtree
```bash
git subtree push --prefix=packages/<subtree-name> <subtree-name> <branch>
```
