interface CheckButtonProps {
  onClick: () => void;
  label?: string;
}

export function CheckButton({ onClick, label }: CheckButtonProps) {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
      <button
        onClick={onClick}
        className="bg-[#08f] content-stretch flex h-[47px] items-center justify-center px-[13.429px] relative rounded-[100px] shrink-0 w-[382.714px] cursor-pointer hover:opacity-90 transition-opacity"
      >
        <div className="flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[21.82px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[26.857px]">{ label ||"Confirm"}</p>
        </div>
      </button>
    </div>
  );
}
