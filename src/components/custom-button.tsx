interface ButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

const definedStyles = new Map();
definedStyles
  .set(0, "bg-[#08f] content-stretch flex      \
          h-[47px] items-center justify-center \
          px-[13px] relative rounded-[100px]   \
          shrink-0 w-[382px] cursor-pointer    \
          hover:opacity-90 transition-opacity")
  .set(1, "");

export default function CustomButton({ onClick, label, className }: ButtonProps) {
  return (
    <div className="content-stretch flex-1 items-center 
      justify-center relative shrink-0">
      <button
        onClick={onClick}
        className={definedStyles.get(0) + className }
      >
        <div className="flex flex-col font-['SF_Pro:Medium',sans-serif] 
          font-[510] justify-center leading-[0] relative shrink-0 text-[22px] 
          text-center text-white whitespace-nowrap" 
          style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[27px]">{ label ||"Confirm"}</p>
        </div>
      </button>
    </div>
  );
}
