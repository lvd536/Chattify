import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */

    images: {
        remotePatterns: [
            new URL(
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCKFe_rylpVqE-XzApv7Pbb6yXugNSyTxth6oN1OLzGoGDgWYccjq8yO3mx3NVxwhrnQNdikWqvFsIP7xrqx64YzvOwWD9247l-1t-Or3Ji3qKuYdY5kBN-KgUiL3lQrdeNa3-QjPamyPSp5F8nVdVFXsXeeS3vCC0gJZpcamvCibIecWI6E5-bznndzjQbofiT2n43X_OFvcTl_o7GdO8alr4bG37oQPuFlfAcVfLIejC8RtWAEhgLvHNmRNUWxRmDltm4ZGef"
            ),
        ],
    },
};

export default nextConfig;
