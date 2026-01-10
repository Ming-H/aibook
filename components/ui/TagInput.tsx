/**
 * TagInput 标签输入组件
 * 使用设计系统 CSS 变量
 */

'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';

export interface TagInputProps {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  maxTags?: number;
  minTags?: number;
  allowDuplicates?: boolean;
  validateTag?: (tag: string) => boolean;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function TagInput({
  label,
  value,
  onChange,
  placeholder = '输入标签后按回车添加...',
  suggestions = [],
  maxTags = 10,
  minTags = 0,
  allowDuplicates = false,
  validateTag,
  errorMessage,
  disabled = false,
  required = false,
  className = '',
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 获取过滤后的建议
  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      (!allowDuplicates ? !value.includes(suggestion) : true)
  );

  // 添加标签
  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();

    // 验证
    if (!trimmedTag) {
      setError('标签不能为空');
      return;
    }

    if (value.length >= maxTags) {
      setError(`最多只能添加 ${maxTags} 个标签`);
      return;
    }

    if (!allowDuplicates && value.includes(trimmedTag)) {
      setError('该标签已存在');
      return;
    }

    if (validateTag && !validateTag(trimmedTag)) {
      setError(errorMessage || '标签格式不正确');
      return;
    }

    onChange([...value, trimmedTag]);
    setInputValue('');
    setError('');
    setShowSuggestions(false);
  };

  // 移除标签
  const removeTag = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
    setError('');
  };

  // 处理键盘事件
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 处理建议导航
    if (showSuggestions && filteredSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        return;
      }
      if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault();
        addTag(filteredSuggestions[highlightedIndex]);
        setHighlightedIndex(-1);
        return;
      }
    }

    // 处理标签输入
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue);
    }

    if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value.length - 1);
    }

    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  // 点击外部关闭建议
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 验证最小标签数量
  const hasMinError = value.length < minTags;
  const hasError = !!error || hasMinError;

  return (
    <div className={`space-y-2 ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          {label}
          {required && <span className="text-[var(--color-red)] ml-1">*</span>}
          {minTags > 0 && (
            <span className="text-[var(--text-muted)] ml-1">
              (最少 {minTags} 个，当前 {value.length} 个)
            </span>
          )}
        </label>
      )}

      {/* 标签容器 */}
      <div
        className={`
          flex flex-wrap gap-2 p-3 min-h-[52px]
          bg-[var(--background-secondary)]
          border rounded-xl
          transition-all
          ${hasError
            ? 'border-[var(--color-red)] focus-within:border-[var(--color-red)]'
            : 'border-[var(--border-default)] focus-within:border-[var(--border-focus)]'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        style={{
          fontFamily: 'var(--font-body)',
        }}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {/* 标签列表 */}
        {value.map((tag, index) => (
          <span
            key={index}
            className={`
              inline-flex items-center gap-1.5 px-3 py-1.5
              bg-[var(--background-tertiary)]
              border border-[var(--border-subtle)]
              rounded-lg text-sm
              transition-all duration-150
              ${disabled ? '' : 'hover:border-[var(--border-strong)]'}
            `}
          >
            <span className="text-[var(--text-primary)]">{tag}</span>
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="text-[var(--text-muted)] hover:text-[var(--color-red)] transition-colors"
                aria-label={`移除 ${tag}`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </span>
        ))}

        {/* 输入框 */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
            setError('');
          }}
          onFocus={() => {
            if (!disabled) {
              setShowSuggestions(true);
            }
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled || value.length >= maxTags}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          style={{ fontFamily: 'var(--font-body)' }}
        />
      </div>

      {/* 建议列表 */}
      {showSuggestions && filteredSuggestions.length > 0 && !disabled && (
        <div
          className="absolute z-[var(--z-dropdown)] w-full mt-1 overflow-hidden rounded-xl border shadow-xl animate-fade-in-down"
          style={{
            backgroundColor: 'var(--background-secondary)',
            borderColor: 'var(--border-default)',
            boxShadow: 'var(--shadow-2xl)',
          }}
        >
          <div className="max-h-48 overflow-y-auto py-1">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => addTag(suggestion)}
                className={`
                  w-full px-4 py-2.5 text-left text-sm transition-colors
                  ${index === highlightedIndex
                    ? 'bg-[var(--background-tertiary)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--background-tertiary)]'
                  }
                `}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 错误提示 */}
      {hasError && (
        <p className="text-sm text-[var(--color-red)] flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error || `至少需要 ${minTags} 个标签`}
        </p>
      )}

      {/* 标签计数 */}
      {maxTags > 0 && !hasError && (
        <p className="text-xs text-[var(--text-muted)]">
          {value.length} / {maxTags} 个标签
        </p>
      )}
    </div>
  );
}

/**
 * 预设标签选择器
 */
export interface TagSelectorProps {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  options: string[];
  maxSelection?: number;
  minSelection?: number;
  disabled?: boolean;
  className?: string;
}

export function TagSelector({
  label,
  value,
  onChange,
  options,
  maxSelection = 5,
  minSelection = 0,
  disabled = false,
  className = '',
}: TagSelectorProps) {
  const toggleTag = (tag: string) => {
    if (disabled) return;

    const isSelected = value.includes(tag);

    if (isSelected) {
      // 允许取消选择（除非违反最小选择数）
      if (value.length > minSelection) {
        onChange(value.filter((t) => t !== tag));
      }
    } else {
      // 添加标签（检查最大选择数）
      if (value.length < maxSelection) {
        onChange([...value, tag]);
      }
    }
  };

  const hasMinError = value.length < minSelection;

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          {label}
          <span className="text-[var(--text-muted)] ml-1">
            (已选 {value.length} / {maxSelection})
          </span>
        </label>
      )}

      {/* 标签网格 */}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value.includes(option);
          const isDisabled = disabled || (!isSelected && value.length >= maxSelection);

          return (
            <button
              key={option}
              type="button"
              onClick={() => toggleTag(option)}
              disabled={isDisabled}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-150
                ${isSelected
                  ? 'bg-[var(--gradient-primary)] text-white shadow-lg'
                  : 'bg-[var(--background-secondary)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--border-strong)]'
                }
                ${isDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer hover:scale-105'
                }
              `}
              style={{
                fontFamily: 'var(--font-body)',
              }}
            >
              {isSelected && (
                <svg className="w-4 h-4 inline-block mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {option}
            </button>
          );
        })}
      </div>

      {/* 错误提示 */}
      {hasMinError && (
        <p className="text-sm text-[var(--color-red)] flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          至少需要选择 {minSelection} 个标签
        </p>
      )}
    </div>
  );
}
