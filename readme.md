Ce projet est un test pour le mode "multijoueur". Ici, je dit "mode multijoueur" mais il s'agit en fait de la possibilité d'intéragir avec un serveur sans faire de simples requêtes HTTP. (C'est à dire de demander au serveur à chaque fois des nouvelles des changements). Cela s'appelle le **"Websocket"**. C'est un protocole qui permet de faire des échanges de données en temps réel. (C'est à dire sans avoir à faire de requêtes HTTP). C'est ce qui permet de faire des jeux en ligne. (Et d'autres choses).

Ce code est en deux partie. L'une dans le dossier "app" est la partie web qui est entre autre l'interface que l'utiliser reçoit. Et l'autre partie du code dans le dossier "server" (et "dist") est la partie du serveur qui permet la connexion en multijoueur.

La partie serveur est coder en "TypeScript". C'est du JavaScript dit "typé". ça permet d'avoir une sécurité supplémentaire sur le code. Et ça permet de faire des choses plus avancées. Mais ça n'est pas obligatoire. On peut coder en JavaScript pur. Mais c'est plus compliqué.

La partie web est coder en pur JavaScript. De cette façon on a pas besoin d'envoier un code compilé à l'utilisateur. (Et en bonus c'est lisible pas comme le TypeScript qui est compilé en JavaScript dans le dossier dist, ce dossier est probablement invisible sur github parcequ'il doit se générer sur votre machine.)

Pour démarrer le serveur vous devez avoir installé nodejs, "pnpm" ou/et "npm" (Veuillez vous renseignez si vous ne connaissez pas ces runtimes/outils).
Ensuite vous pourrez éxécuter dans le terminal `pnpm compile` pour compiler le code en JavaScript. Et `pnpm dev` pour démarrer le serveur. 

---

Enfin, en vous rendant à l'adresse `localhost:8080` vous pourriez accéder au serveur.