import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useDebouncedMemo } from '../../hooks/useDebouncedMemo';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { DropdownOptionType, CategoryType } from './types';
import DropDownOption from './dropdown-option';
import ClearIcon from './clear-icon';
import ExpandIcon from './expand-icon';

const defaultGroupsOpenState = {
  [CategoryType.Symbol]: true,
  [CategoryType.Page]: true,
  [CategoryType.Person]: true,
  [CategoryType.Headline]: true
};

interface DropdownProps {
  search: string;
  onSearch: (search: string) => void;
  options: Array<DropdownOptionType>;
}

const Dropdown = ({ search, onSearch, options }: DropdownProps) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);

  const [groupsOpenStates, setGroupsOpenStates] = useState(
    defaultGroupsOpenState
  );

  const isMobile = useMediaQuery('(max-width:550px)');

  const groupedByType = useDebouncedMemo(
    () =>
      Object.groupBy(
        options.filter((option) =>
          (option.name ?? option.title)!
            .toLowerCase()
            .includes(search.toLowerCase())
        ),
        (option: DropdownOptionType) => option.type
      ),
    [options, search],
    500
  );

  useEffect(() => {
    setGroupsOpenStates(defaultGroupsOpenState);
  }, [groupedByType]);

  const typesOrder = [
    CategoryType.Symbol,
    CategoryType.Page,
    CategoryType.Person,
    CategoryType.Headline
  ];

  const typesToRender = typesOrder.filter((type) => !!groupedByType[type]);

  const isEmpty = typesToRender.length === 0;

  const handleInputFocus = () => {
    setOpen(true);
  };

  const handleClear = () => {
    onSearch('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleOptionClick = (option: DropdownOptionType) => {
    console.log('selected option', option);
  };

  const handlePortalMouseDown = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.stopPropagation();
  };

  /**
   * Renders portal if not mobile.
   */
  const renderPortal = (content: React.ReactNode) => {
    if (isMobile) {
      return content;
    }

    return createPortal(
      <div
        ref={dropdownRef}
        style={{
          position: 'fixed',
          top: anchorRef.current!.getBoundingClientRect().top,
          left: anchorRef.current!.getBoundingClientRect().left,
          transform: `translate(0, ${anchorRef.current!.getBoundingClientRect().height}px)`,
          width: `${anchorRef.current!.getBoundingClientRect().width}px`
        }}
        className="border-navy-40 border-[1px] border-t-0 bg-white"
      >
        {content}
      </div>,
      document.body
    );
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // when clicked outside dropdown
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div className="w-full max-w-[600px]">
      <div
        ref={anchorRef}
        className="border-navy-40 flex h-[50px] w-full items-center border-[1px] px-[13px] py-0 pr-[18px]"
      >
        <input
          value={search}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="h-full w-full text-[16px] focus:outline-none focus-visible:outline-none"
          role="searchbox"
        />
        {search && (
          <button
            onClick={handleClear}
            className="mr-[12px] focus:outline-none"
          >
            <ClearIcon />
          </button>
        )}
        <a
          href="https://seekingalpha.com/"
          target="_blank"
          rel="noreferrer"
          className="text-[12px] font-medium uppercase text-blue-100 hover:underline"
        >
          Advanced
        </a>
      </div>
      {open &&
        search &&
        renderPortal(
          <>
            {typesToRender.map((type) => (
              <div key={type}>
                <div
                  className="bg-black-10 flex h-[28px] cursor-pointer justify-between px-[18px] py-[6px] pl-[16px] text-[12px] font-medium uppercase leading-[16px]"
                  onClick={() => {
                    setGroupsOpenStates((state) => ({
                      ...state,
                      [type]: !state[type]
                    }));
                  }}
                >
                  <div className="flex">
                    <button
                      className={`mr-[4px] h-[16px] w-[16px] border-0 bg-transparent text-[16px] focus:outline-none focus-visible:outline-none ${groupsOpenStates[type] ? 'rotate-180' : ''}`}
                    >
                      <ExpandIcon />
                    </button>
                    <span>{type}</span>
                  </div>
                  <a
                    href="https://seekingalpha.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-100 hover:underline"
                    onClick={handlePortalMouseDown}
                  >
                    MORE
                  </a>
                </div>
                {groupsOpenStates[type] && (
                  <ul>
                    {groupedByType[type]!.map((option) => (
                      <DropDownOption
                        search={search}
                        option={option}
                        onClick={handleOptionClick}
                        key={`${option.type}-${(option.name ?? option.title)!}`}
                      />
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {!isEmpty && (
              <div className="border-black-20 text-black-60 flex h-[42px] items-center border-t px-[18px] text-[14px] uppercase">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer text-blue-100 hover:underline"
                  href="https://seekingalpha.com/"
                >
                  See more result for "{search}"
                </a>
              </div>
            )}

            {isEmpty && (
              <div className="border-black-20 text-black-60 flex h-[42px] items-center border-b px-[18px] text-[14px] last:border-b-0">
                No options found.
              </div>
            )}
          </>
        )}
    </div>
  );
};

export default Dropdown;
