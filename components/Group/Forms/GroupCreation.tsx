"use client";
import { useState } from "react";

interface IFormData {
    name: string;
    description: string;
    members: string[];
    photoURL: string;
}

interface IProps {
    uid: string;
}

export default function GroupCreation({ uid }: IProps) {
    const [formData, setFormData] = useState<IFormData>({
        name: "",
        description: "",
        members: [],
        photoURL: "",
    });
    return <form action="">GroupCreation</form>;
}
