# MERN Stack Projekat: Tinder Clone

## Neke funkcionalnosti

- ⚛️ **Tehnologije**: React.js, Node.js, Express, MongoDB, Tailwind CSS + DaisyUI
- 🔐 **Autentifikacija** pomoću JSON Web Tokena (JWT)
- ⚡ **Axios** za komunikaciju sa serverom (dohvat i slanje podataka)
- 📦 **Zustand** za jednostavno i efikasno upravljanje globalnim stanjem
- 🧠 **Socket.IO** za real-time komunikaciju između korisnika
- 💬 **Razmena poruka uživo** između uparenih korisnika
- 🔔 **Real-time obaveštenja** (npr. novi match)
- 👥 **Preporučeni korisnici** - na osnovu preference
- ❤️ **Swajpovanje** korisnika (levo/desno)
- 🔄 **Match sistem** – kada se dvoje korisnika lajkuju međusobno
- ✍️ **Izmena profila**, uključujući slike i biografiju
- 📷 **Otpremanje profilnih slika** putem Cloudinary servisa
- 🌐 **Pripremljeno za deployment** – lako hostovanje na Vercel/Render ili drugim servisima

### .env setup

```bash
PORT=5000
MONGO_URI=...

JWT_SECRET=...

NODE_ENV=...
CLIENT_URL=http://localhost:5173

CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_CLOUD_NAME=...
```

### Pokretanje aplikacije lokalno

- Podesiti `NODE_ENV=production` i buildovati aplikaciju 

```shell
npm run build
```

### Start 

```shell
npm run start
```

### Login page

![Login page](./client/public/project-media/0.%20sign%20in%20page.png)

### Signup page

![Signup page](./client/public/project-media/0.%20sign%20up%20page.png)

### Homepage

![Homepage](./client/public/project-media/1.%20homepage.png)

### Swiping Left

![Swiping left](./client/public/project-media/2.%20swiping%20left.png)

### Passed

![Passed](./client/public/project-media/3.%20passed.png)

### Swiping Right

![Swiping Right](./client/public/project-media/4.%20swiping%20right.png)

### Liked

![Liked](./client/public/project-media/5.%20liked.png)

### Like To Match

![Like To Match](./client/public/project-media/6.%20like%20to%20match.png)

### New Match

![New Match](./client/public/project-media/7.%20new%20match.png)

### New Chat

![New Chat](./client/public/project-media/8.%20new%20chat.png)

### Chatting

![Chatting](./client/public/project-media/9.%20chatting.png)

### Profile And Logout

![Profile And Logout](./client/public/project-media/10.%20profile%20and%20logout.png)

### Edit Profile

![Edit Profile](./client/public/project-media/11.%20edit%20profile.png)



### Video demonstracija - Chatting Record (View Raw - download)

[▶️ Pogledaj video - App Process](./client/public/project-media/chatting%20record.mp4)

### Video demonstracija - Swiping Process Record (View Raw - download)

[▶️ Pogledaj video - Login/Logout](./client/public/project-media/swiping%20process%20record.mp4)
