import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextInput } from 'flowbite-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
    const { currentUser } = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const filePickerRef = useRef();

    // Al cargar el componente, recupera la imagen almacenada en localStorage
    useEffect(() => {
        const storedImage = localStorage.getItem('profileImage');
        if (storedImage) {
            setImageFileUrl(storedImage); // Muestra la imagen almacenada
        }
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);

            // Mostrar la imagen seleccionada inmediatamente
            const objectUrl = URL.createObjectURL(file);
            setImageFileUrl(objectUrl);

            // Convertir la imagen a Base64 y almacenarla en localStorage
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result;
                localStorage.setItem('profileImage', base64String); // Guardar en localStorage
            };
            reader.readAsDataURL(file); // Convierte la imagen a Base64

            // Simular progreso (puedes reemplazar esto con tu lógica de subida)
            simulateUploadProgress();
        }
    };

    const simulateUploadProgress = () => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setImageFileUploadProgress(progress);
            if (progress >= 100) clearInterval(interval);
        }, 500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario actualizado");
    };

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={filePickerRef}
                    hidden
                />
                <div
                    className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
                    onClick={() => filePickerRef.current.click()}
                    style={{
                        backgroundImage: `url(${imageFileUrl || currentUser.profilePicture})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: '8px solid lightgray',
                    }}
                >
                    {imageFileUploadProgress !== null && (
                        <CircularProgressbar
                            value={imageFileUploadProgress}
                            text={`${imageFileUploadProgress}%`}
                            strokeWidth={5}
                            styles={buildStyles({
                                pathColor: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                                textColor: '#3E98C7',
                                trailColor: 'rgba(255, 255, 255, 0.5)',
                                backgroundColor: 'transparent',
                            })}
                        />
                    )}
                </div>

                <TextInput
                    type="text"
                    id="username"
                    placeholder="username"
                    defaultValue={currentUser.username}
                />
                <TextInput
                    type="email"
                    id="email"
                    placeholder="email"
                    defaultValue={currentUser.email}
                />
                <TextInput type="password" id="password" placeholder="password" />
                <Button type="submit" gradientDuoTone="purpleToBlue" outline>
                    Update
                </Button>
            </form>
            <div className="text-red-500 flex justify-between mt-5">
                <span className="cursor-pointer">Delete Account</span>
                <span className="cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}
