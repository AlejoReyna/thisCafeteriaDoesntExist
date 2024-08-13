
<img width="359" alt="Screenshot 2024-08-13 at 2 02 20 p m"  align="left" src="https://github.com/user-attachments/assets/b981d511-3ee7-4314-b95f-94a38f9574a6">

# A coffe shop project

This repo contains the source-code of the deployed website: // here will go the final link // , which is a simulated coffee shop where you can register, order some bags of coffee, pay with your card, and get a receipt. All of the data is stored locally in your browser as I didn't intended to pay for a cloud instance of a DB, buy I may do it later. 

## Table of Contents
- How does it work?

## The title animation: 

<img width="1432" alt="Screenshot 2024-08-13 at 2 10 09 p m" src="https://github.com/user-attachments/assets/e0e0bdfb-7271-4611-9dd7-c9cffbd6e758">

The first time you enter the website, or when doing a reload in the Homepage, you'll see this animation displaying the title of the shop, and a slogan below it. The way this works is because of the script inside 'components/Loader.js':

```typescript
export default function Loader() {

    // The value starts with '1', meaning it will be fully visible at the begining
    const [elementsOpacity, setElementsOpacity] = useState(1); 

    // All values below mean that the element will not be displayed initially
    const [hrWidth, setHrWidth] = useState(0); 
    const [h1Height, setH1Height] = useState(0);
    const [h6Height, setH6Height] = useState(0);

    // Starts the animations immediately
    useEffect(() => {
        setHrWidth(100); // Width = 100px;
        setH1Height(30); // Height = 30px;
        setH6Height(100); // Height = 100px;

        // After two seconds, the elements will gradually fade.
        const timer = setTimeout(() => {
            setElementsOpacity(0);
        }, 2000);

        // Ensures the function is cleared 
        return () => clearTimeout(timer);
    }, []);
```
Right after the two seconds, it displays the homepage: 

## Homepage 

<img width="1440" alt="Screenshot 2024-08-13 at 2 25 05 p m" src="https://github.com/user-attachments/assets/7b7ac50c-ae4c-4b83-9536-cd51ee7ff623">

The Homepage consist of three components: A navbar, a homepage, and a footer. I'll explain the Navbar after this, footer is just HTML code so I think it speaks for itself.

```typescript
export default function Home() {
    // First I define an array that stores the four images going to be rendered
    const images = [firstPic, secondPic, thirdPic, fourthPic];

    // States that the firstPic (which index is '0') renders first.
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // First image is initially visible.
    const [isImageVisible, setIsImageVisible] = useState(true);

    useEffect(() => {
        const imageToggleInterval = setInterval(() => {
          // After 10 seconds, the image display changes it's visible value to false
            setIsImageVisible(false);

            setTimeout(() => {
                setCurrentImageIndex(prevIndex =>
                    // Index value increments by one, the '% images.length' ensures it loops when the 4 picture is rendered.
                    // Mathematical explanation: (3 + 1)  % 4 = 0
                    (prevIndex + 1) % images.length
                );
                setIsImageVisible(true);
            }, 1000); // 1 second for bluring effect
        }, 10000); // Image changes after 10 seconds

        //  Returned from useEffect and will be called when the component unmounts.
        return () => clearInterval(imageToggleInterval);
    }, []);
```
The way we can navigate between the pages, it's by using 'next/link', used in the Navbar.

## Navbar 
<img width="1423" alt="Screenshot 2024-08-13 at 2 43 32 p m" src="https://github.com/user-attachments/assets/d291ff59-ef86-4729-8a3b-48c59323884b">

This is the way I routed the pages
```typescript
                       <Link href="/AboutUs"
                        className="block lg:inline-block mr-4 hover-effect">
                            ABOUT US
                        </Link>
                        <Link href="/Products"
                           className="block lg:inline-block mr-4 hover-effect">
                            OUR PRODUCTS
                        </Link>
                        <Link href="/OurStores">
                           className="block lg:inline-block hover-effect">
                            OUR STORES
                        </Link>
```

In this component, the Log In button is the only one who uses TypeScript, here's how it works: 

```typescript
export default function Navbar() {

    // Username functions

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    // When you register, the username is saved inside the localStorage as an item called 'username', if not found, the LOG IN button displays.
    const getUsername = (): string => {
        return localStorage.getItem("username") || "LOG IN";
    }

    // UserImage functions

    // Image is stored as a base64 string 
    const [profileImage, setProfileImage] = useState<string | null>(null);

    // This function is responsible of letting the user set an image file as their profile picture.
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Gets the first file from the input element
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setProfileImage(base64String);
                localStorage.setItem('profileImage', base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);


    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const handleOpenPopup = (): void => {
        setShowPopup(true);
    }

    const handleClosePopup = (): void => {
        setShowPopup(false);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("username", username);

        // Save both data in a same object
        localStorage.setItem('userData', JSON.stringify([email, password]) );

        setIsLoggedIn(true);
        handleClosePopup();
    }

    // Verifies if there's an already logged user
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setIsLoggedIn(true);
        }
    }, []);
```



