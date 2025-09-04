interface CoreCardProps {
    className?: string;
    title: string;
    description: string;
}

export const CoreCard: React.FC<React.PropsWithChildren & CoreCardProps> = ({ className, title, description, children }) => {
    return (
        <div className={`flex flex-1 flex-col p-3.5 gap-5 border border-border rounded-[6px] ${className}`}>
            <div className="flex flex-col gap-1">
                <h3 className="text-3xl font-medium text-black leading-[120%]">{title}</h3>
                <p className="text-base font-normal text-black leading-[150%]">{description}</p>
            </div>
            {children}
        </div>
    )
}