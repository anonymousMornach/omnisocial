// Setting.js
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import SimpleModal from '@/components/Utils/SimpleModal';
import {
    TextField,
    Button,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Avatar,
    Grid,
    Box,
    CircularProgress
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import axios, { AxiosResponse } from 'axios';
import { getToken } from '@/utils/token';
import SettingsSkeleton from "@/components/Skeleton/SettingsSkeleton"

export default function Setting() {
    const {data: specificUser, error: specificUserError, isLoading: isSpecificUserLoading} = useSWR(
        `${process.env.NEXT_PUBLIC_API}/users/user/private`,
        fetcher, { refreshInterval: 1000 }
    );

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<any>('');
    const [name, setName] = useState<any>('');
    const [email, setEmail] = useState<any>('');
    const [age, setAge] = useState<any>('');
    const [maritalStatus, setMaritalStatus] = useState<any>('');
    const [profilePic, setProfilePic] = useState<any>('');
    const [file, setFile] = useState<any>(null);
    const [isFormDirty, setIsFormDirty] = useState(false); // New state variable for tracking changes


    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

    const handleProfilePicChange = (e: any) => {
        setIsFormDirty(true);
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePic(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleAgeChange = (e:any)=>{
        setIsFormDirty(true)
        setAge(e.target.value)
    }
    const handleMaritalStatusChange = (e:any)=>{
        setIsFormDirty(true)
        setMaritalStatus(e.target.value)
    }
    const handleEmailChange = (e:any)=>{
        setIsFormDirty(true)
        setEmail(e.target.value)
    }
    const handleNameChange = (e:any)=>{
        setIsFormDirty(true)
        setName(e.target.value)
    }


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true when the submit process starts
        const token = await getToken();
        if (!name && specificUser.name) {
            setName(specificUser.name)
        }
        if (!email && specificUser.email) {
            setEmail(specificUser.email)
        }
        if (!age && specificUser.age) {
            setAge(specificUser.age)
        }
        if (!maritalStatus && specificUser.maritalStatus) {
            setMaritalStatus(specificUser.maritalStatus)
        }
        if (!profilePic && specificUser.profilePicture) {
            setProfilePic(specificUser.profilePicture)
        }

        try {
            let profilePicture = ""
            const formDataApi = {
                name: undefined as string | undefined,
                email: undefined as string | undefined,
                maritalStatus: undefined as string | undefined,
                age: undefined as string | undefined,
                profilePicture: undefined as string | undefined,
            }
            const formDataCloud = new FormData();
            if (profilePic) {
                formDataCloud.append('upload_preset', `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`);
                formDataCloud.append('file', file || '');
                const responseCloud = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, formDataCloud);
                console.log(responseCloud.data.secure_url)
                profilePicture = responseCloud.data.secure_url;
            }

            formDataApi.name = name;
            formDataApi.email = email;
            formDataApi.age = age;
            formDataApi.maritalStatus = maritalStatus;
            if(profilePic){
                formDataApi.profilePicture = profilePicture;
            }
            const response: AxiosResponse = await axios.put(`${process.env.NEXT_PUBLIC_API}/users`, formDataApi, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Handle successful
            setIsFormDirty(false)
            setMessage("Details Updated Successfully")
            setIsModalOpen(true); // Open the modal
            setIsLoading(false); // Set loading state to true when the submit process starts
        } catch (error) {
            // Handle failed submit\
            setIsFormDirty(false)
            setMessage("Server error")
            setIsModalOpen(true); // Open the modal
            setIsLoading(false); // Set loading state to true when the submit process starts
        }
    };

    if (isSpecificUserLoading) {
        return (
            <SettingsSkeleton/>
        );
    }

    if (specificUserError) {
        return (
            <SettingsSkeleton/>
        );
    }

    if (specificUser) {
        return (
            <Box py={4} px={2}>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <input
                                accept="image/*"
                                id="profile-pic-input"
                                type="file"
                                style={{display: 'none'}}
                                onChange={handleProfilePicChange}
                            />
                            <label htmlFor="profile-pic-input">
                                <Avatar
                                    src={profilePic || specificUser.profilePicture}
                                    alt="Profile Picture"
                                    sx={{width: 150, height: 150, cursor: 'pointer'}}
                                >
                                    {!profilePic && <CameraAltIcon fontSize="large"/>}
                                </Avatar>
                            </label>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                value={name || specificUser.name}
                                onChange={handleNameChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                type="email"
                                value={email || specificUser.email}
                                onChange={handleEmailChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Age"
                                type="number"
                                value={age || specificUser.age}
                                onChange={handleAgeChange}
                                fullWidth
                                margin="normal"
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Marital Status</InputLabel>
                                <Select
                                    value={maritalStatus || specificUser.maritalStatus}
                                    onChange={handleMaritalStatusChange}
                                >
                                    <MenuItem value="single">Single</MenuItem>
                                    <MenuItem value="married">Married</MenuItem>
                                    <MenuItem value="divorced">Divorced</MenuItem>
                                    {/* Add more options as needed */}
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                disabled={!isFormDirty || isLoading} // Disable the button when the form is not dirty or when loading is ongoing
                                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null} // Display the loading animation when isLoading is true
                            >
                                Save Changes
                            </Button>
                        </form>
                    </Grid>
                </Grid>
                <SimpleModal
                    open={isModalOpen}
                    close={() => setIsModalOpen(false)}
                    message={message}
                />
            </Box>
        );
    }
}