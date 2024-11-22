import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';

export const LanguagesSelector = () => {
  return (
    <li className="uppercase font-extrabold relative z-10">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="flex items-center gap-2 text-white">
            {' '}
            EN{' '}
            <Image
              src="/images/en-img.svg"
              alt="Language"
              width={24}
              height={24}
              priority
            />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="w-[220px] max-h-[270px] overflow-y-auto p-0 bg-pink-100 z-[2] mt-5 rounded border border-white">
            <DropdownMenuItem className="rounded text-white p-2 hover:text-green-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
              <Image
                src="/images/ar.svg"
                alt="Flag"
                width={25}
                height={25}
                className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
              />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded text-white p-2 hover:text-green-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
              <Image
                src="/images/ar.svg"
                alt="Flag"
                width={25}
                height={25}
                className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
              />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded text-white p-2 hover:text-green-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
              <Image
                src="/images/ar.svg"
                alt="Flag"
                width={25}
                height={25}
                className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
              />
              Team
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded text-white p-2 hover:text-green-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
              <Image
                src="/images/ar.svg"
                alt="Flag"
                width={25}
                height={25}
                className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
              />
              Subscription
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded text-white p-2 hover:text-green-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
              <Image
                src="/images/ar.svg"
                alt="Flag"
                width={25}
                height={25}
                className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
              />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded text-white p-2 hover:text-green-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
              <Image
                src="/images/ar.svg"
                alt="Flag"
                width={25}
                height={25}
                className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
              />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded text-white p-2 hover:text-green-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
              <Image
                src="/images/ar.svg"
                alt="Flag"
                width={25}
                height={25}
                className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
              />
              Team
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded text-white p-2 hover:text-green-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
              <Image
                src="/images/ar.svg"
                alt="Flag"
                width={25}
                height={25}
                className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
              />
              Subscription
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
};
