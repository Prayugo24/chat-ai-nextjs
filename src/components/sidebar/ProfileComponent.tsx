import Image from "next/image"

export const ProfileComponent = () => {
    return (
        <div className="flex items-center gap-3">
            <Image
                alt="my profile"
                width={32}
                height={32}
                src="https://lh3.googleusercontent.com/a/ACg8ocIHL2FgNVTPbLbGELimDkVMhr0Y8CRnckgwN_l1Dg9cKNhA2HT8=s96-c"
                className="w-10 h-10 rounded-full"
                />
            <div className="flex-1">
            <div className="font-medium">By Developers</div>
            <div className="text-sm text-gray-500">Personal</div>
            </div>
        </div>
    )
}