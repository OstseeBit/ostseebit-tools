## Konfiguration

Globale Konfiguration festlegen

```shell
git config --global user.name "[name]"
git config --global user.email "[email]"
```

## Erste Schritte

Ein Git-Repository erstellen

```shell
git init
```

Ein bestehendes Git-Repository klonen

```shell
git clone [url]
```

## Commit

Alle nachverfolgten Änderungen committen

```shell
git commit -am "[commit message]"
```

Neue Änderungen zum letzten Commit hinzufügen

```shell
git commit --amend --no-edit
```

## Ich habe einen Fehler gemacht

Commit-Nachricht des letzten Commits ändern

```shell
git commit --amend
```

Den letzten Commit rückgängig machen und die Änderungen behalten

```shell
git reset HEAD~1
```

Die letzten `N` Commits rückgängig machen und die Änderungen behalten

```shell
git reset HEAD~N
```

Den letzten Commit rückgängig machen und die Änderungen verwerfen

```shell
git reset HEAD~1 --hard
```

Branch auf den Stand des Remotes zurücksetzen

```shell
git fetch origin
git reset --hard origin/[branch-name]
```

## Sonstiges

Den lokalen Branch master in main umbenennen

```shell
git branch -m master main
```
