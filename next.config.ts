import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */

    images: {
        remotePatterns: [
            new URL(
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCKFe_rylpVqE-XzApv7Pbb6yXugNSyTxth6oN1OLzGoGDgWYccjq8yO3mx3NVxwhrnQNdikWqvFsIP7xrqx64YzvOwWD9247l-1t-Or3Ji3qKuYdY5kBN-KgUiL3lQrdeNa3-QjPamyPSp5F8nVdVFXsXeeS3vCC0gJZpcamvCibIecWI6E5-bznndzjQbofiT2n43X_OFvcTl_o7GdO8alr4bG37oQPuFlfAcVfLIejC8RtWAEhgLvHNmRNUWxRmDltm4ZGef"
            ),
            new URL(
                "https://lh3.googleusercontent.com/a/ACg8ocL4-J_i7Q-R8j3Bh3zM1JxkWhkotiqX-YU_7XZvTNullG00jJk=s96-c"
            ),
            new URL(
                "https://lh3.googleusercontent.com/a/ACg8ocIYWWxiMR4LRaOq8qTxsP-r84hLi1tV2CapF6Yo9UpWSTqMV_U=s96-c"
            ),
        ],
    },
};

export default nextConfig;
