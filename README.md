# doublet
Handle any Javascript and Typescript function as an error and response tuple. This prevents declaring variables outside of a try/catch block for a cleaner flow.

[![doublet](https://img.shields.io/npm/v/doublet.svg)](https://www.npmjs.com/package/doublet)
[![licence](https://img.shields.io/github/license/mats852/doublet)](https://img.shields.io/github/license/mats852/doublet)

## Installation

```shell
npm i doublet
```

## Usage
### Traditionnal error handling
```ts
import axios from 'axios';
import doublet from 'doublet';
import HttpException from 'your-favorite-error-handler';

async function fetchUser(id: string): User {
  let user;

  try {
    user = await axios(`/users/${id}`);
  } catch (error) {
    throw new HttpException(`Could not fetch user ID "${id}", Error; ${error.message}`, error.status);
  }

  // Do something with user
}

```

### With doublet

```ts
import axios from 'axios';
import doublet from 'doublet';
import HttpException from 'your-favorite-error-handler';

async function fetchUser(id: string): User {
  const [userError, user] = await doublet(axios, `/users/${id}`);
  if (userError) throw new HttpException(`Could not fetch user ID "${id}", Error; ${userError.message}`, userError.status);

  // Do something with user
}
```
