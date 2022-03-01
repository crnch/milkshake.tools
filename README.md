# Give your mnemonic phrase a little twist

This is a PoC for modifying a seed- or mnemonic phrase in a reversable way ([online version](https://milkshake.tools)).
It takes a 12- or 24-word mnemonic phrase and a key as input and displays the result.
The key is a number which has to be relatively prime to 2048.
2048 happens to be the number of words in the [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) wordlist.
Numbers that are relatively prime are invertible in modulus space.
Given a mnemonic phrase, the program computes a new index in the wordlist for each word and outputs the derived modified mnemonic phrase.
It's comparable to the [Caesars Cipher](https://en.wikipedia.org/wiki/Caesar_cipher) but instead of a shift via addition, the shift happens via multiplication.

## Can I input my mnemonic phrase on the website

Well you certainly _can_ but you probably **shouldn't** put in seed phrases holding real funds.
While the homepage itself has no backend and all computations are done on the computer it's being accessed with, it's generally very very bad practice to input your seed phrases anywhere except when using them for regaining access.
Remember: your browser with all it's extensions constantly running code from untrusted sources is _not_ a save place.
Further down you will find instructions on how to run this code locally.
Not communicating with the outside world on fresh device while putting in your seed phrase is less insecure.

## Should I trust the author of this code with my mnemonic phrase?

Absolutely not. In general, you should be very careful who to trust with your mnemonic phrase.
If the other person is a random encounter on the interwebs, the answer should be "no" in 99.999999% of cases (which is the mathematical equivalent of never).
However, you can trust code.
It's out in the open and clearly does no harm.
_But_ this project uses `npm`.
`nodejs` projects are infamous for their dependecy trees.
After installing all dependencies, the `node_modules` directory has > 800 entries.
Ask yourself: with how much money would you trust 800 strangers?

## Why does this exist?

The author of this code became a little paranoid about where to savely store mnemonic phrases.
Especially in the case of HW-Wallets like Ledger, a compromised seed phrase is absolutely devastating.
Furthermore, it can stay unnoticed for years and essentially means the loss of all funds on all blockchains.
Seed phrases are easily recognizable once the words they're build with are known.
An ape is probably capable of doing that.
Learning about the wonders of modulus arithmetics in [Stanford's excellent introduction to Cryptography](https://www.coursera.org/learn/crypto), the author decided that there is a better way.
Please note that the method presented here is not a _real_ robust encryption.
It just a play with numbers.
The solution space is way to little to provide real security.

## Can I store my mnemonic phrase (more) openly after applying this method?

No. It's just a linear transformation which basically does not add security at all when facing a real adversary.
It's not a real encryption.
It prevents apes from _just_ putting in the exact words and getting access to all funds.
However, if the method presented in this script is known to the attacker, the original seedphrase can be easily derived from the modified one via bruteforce without prior knowledge of the key.

## How to run this locally

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
