import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'

interface Option {
  label: string
  value: string
}

interface DropdownProps {
  options?: Option[]
  onSelect?: (value: string) => void
  defaultValue?: string
  placeholder?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  options = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
  ],
  onSelect,
  defaultValue,
  placeholder = 'Choose a community',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string | undefined>(defaultValue)

  const handleSelect = (value: string) => {
    setSelected(value)
    onSelect && onSelect(value)
    setIsOpen(false)
  }

  // Find the label of the selected option, or use placeholder
  const displayLabel = selected ? options.find(opt => opt.value === selected)?.label : placeholder

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-fit px-4 py-2 rounded  text-[#49A569]
          ${selected ? 'bg-white ' : 'bg-gray-100'}
          border border-[#49A569]
        `}
      >
        {displayLabel}
        <ChevronDown className="ml-2 w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
          <ul className="py-2">
            {options.map(option => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                  flex justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer 
                  ${selected === option.value ? 'bg-green-100' : ''}
                `}
              >
                {option.label}
                {selected === option.value && <Check className="w-4 h-4" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Dropdown
