/**
 * Select 下拉选择组件
 * 使用设计系统 CSS 变量
 */

'use client';

import { useState, useRef, useEffect } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = '请选择...',
  error,
  disabled = false,
  required = false,
  className = '',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // 获取当前选中的选项
  const selectedOption = options.find((opt) => opt.value === value);

  // 点击外部关闭下拉
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // 选择选项
  const handleSelect = (option: SelectOption) => {
    if (!option.disabled) {
      onChange(option.value);
      setIsOpen(false);
    }
  };

  const hasError = !!error;

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {label && (
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          {label}
          {required && <span className="text-[var(--color-red)] ml-1">*</span>}
        </label>
      )}

      {/* 触发按钮 */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-3 pr-10
          text-left text-sm
          bg-[var(--background-secondary)]
          border rounded-xl
          transition-all
          flex items-center justify-between
          ${hasError
            ? 'border-[var(--color-red)] focus:border-[var(--color-red)]'
            : 'border-[var(--border-default)] focus:border-[var(--border-focus)]'
          }
          ${disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:border-[var(--border-strong)]'
          }
          ${isOpen ? 'ring-2 ring-[var(--color-brand)]/20' : ''}
        `}
        style={{
          fontFamily: 'var(--font-body)',
        }}
      >
        <span className={selectedOption ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}>
          {selectedOption?.label || placeholder}
        </span>

        {/* 下拉箭头 */}
        <svg
          className={`w-5 h-5 text-[var(--text-muted)] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 错误提示 */}
      {hasError && (
        <p className="mt-2 text-sm text-[var(--color-red)] flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {/* 下拉选项 */}
      {isOpen && !disabled && (
        <div
          className="absolute z-[var(--z-dropdown)] w-full mt-2 overflow-hidden rounded-xl border shadow-xl animate-fade-in-down"
          style={{
            backgroundColor: 'var(--background-secondary)',
            borderColor: 'var(--border-default)',
            boxShadow: 'var(--shadow-2xl)',
          }}
        >
          <div className="max-h-60 overflow-y-auto py-1">
            {options.length === 0 ? (
              <div
                className="px-4 py-3 text-sm text-[var(--text-muted)] text-center"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                暂无选项
              </div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  disabled={option.disabled}
                  className={`
                    w-full px-4 py-3 text-left text-sm transition-colors
                    ${option.value === value
                      ? 'bg-[var(--background-tertiary)] text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--background-tertiary)]'
                    }
                    ${option.disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'cursor-pointer'
                    }
                  `}
                  style={{
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {option.value === value && (
                      <svg
                        className="w-5 h-5 text-[var(--color-brand)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
