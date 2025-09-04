interface CardProps {
    className?: string;
    title?: string;
    upperTitle?: string;
    description: string;
    descriptionClassName?: string;
    icon?: React.ReactNode;
}

export const Card: React.FC<React.PropsWithChildren & CardProps> = ({ className, title, upperTitle, description, icon, descriptionClassName }) => {
    return (
        <div className={`flex flex-1 flex-col p-5 gap-2.5 border border-border rounded-[6px] ${className}`}>
            <div className="flex flex-row items-center gap-2.5">
                {icon && <div className="flex items-center justify-center p-2.5 bg-secondary rounded-[6px]">{icon}</div>}
                <div className="flex flex-col gap-1">
                    {upperTitle && <p className="text-[18px] font-bold text-black leading-[100%]">{upperTitle}</p>}
                    {title && <h3 className="text-xl font-normal text-black leading-[140%]">{title}</h3>}
                </div>
            </div>
            <p className={`text-base font-normal text-black leading-[150%] ${descriptionClassName}`}>{description}</p>
        </div>
    )
}