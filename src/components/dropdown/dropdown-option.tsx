import clsx from 'clsx';
import Highlighter from 'react-highlight-words';

import { CategoryType, DropdownOptionType } from './types';

interface DropdownOptionProps {
  search: string;
  option: DropdownOptionType;
  onClick: (option: DropdownOptionType) => void;
}

const DropDownOption = ({ search, option, onClick }: DropdownOptionProps) => {
  const label: string = (option.name ?? option.title)!;

  const handleClick = () => {
    onClick(option);
  };

  return (
    <li
      onClick={handleClick}
      className="cursor-pointer border-black-20 flex min-h-[42px] items-center text-[14px] px-[18px] py-[4px] hover:bg-orange-100 relative before:absolute before:content-[''] before:w-[calc(100%-36px)] before:bottom-[0px] before:h-[1px] before:bg-black-20 last:before:hidden leading-[16px]"
      // @ts-ignore
      style={{ '--tw-bg-opacity': 0.12 }}
    >
      <span
        className={clsx(option.type === CategoryType.Symbol && 'basis-[90px]')}
      >
        <Highlighter
          highlightClassName="bg-transparent relative before:absolute before:content-[''] before:w-full before:h-[2px] before:bg-orange-100 before:bottom-[-2px]"
          searchWords={[search]}
          textToHighlight={label}
        />
      </span>
      {!!option.description && <span className="text-black-60">{option.description}</span>}
    </li>
  );
};

export default DropDownOption;
