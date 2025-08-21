import { useState, useEffect } from "react";
import { Link } from "wouter";
import { X, Moon, Sun } from "lucide-react";
import { RoutineContent, TableData } from "../../../shared/routine-types";

interface RoutineTemplateProps {
  title: string;
  author: string;
  content: RoutineContent[];
}

export default function RoutineTemplate({ title, author, content }: RoutineTemplateProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    setIsDarkMode(stored === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const renderContent = (item: RoutineContent, index: number) => {
    const baseStyle = {
      color: isDarkMode ? '#f3f4f6' : '#1f2937',
      fontFamily: 'Georgia, serif'
    };

    switch (item.type) {
      case 'paragraph':
        return (
          <p
            key={index}
            style={{
              ...baseStyle,
              marginBottom: '24px',
              fontSize: '1.125rem',
              lineHeight: '1.7'
            }}
            dangerouslySetInnerHTML={{ __html: item.text || '' }}
          />
        );

      case 'heading':
        const HeadingTag = `h${item.level}` as keyof JSX.IntrinsicElements;
        const headingStyles = {
          1: { fontSize: '2.5rem', marginTop: '48px', marginBottom: '24px' },
          2: { fontSize: '2rem', marginTop: '48px', marginBottom: '24px' },
          3: { fontSize: '1.5rem', marginTop: '40px', marginBottom: '16px' },
          4: { fontSize: '1.25rem', marginTop: '32px', marginBottom: '12px' }
        };

        return (
          <HeadingTag
            key={index}
            style={{
              ...baseStyle,
              fontWeight: item.level === 4 ? '600' : 'bold',
              color: isDarkMode ? '#ffffff' : '#1f2937',
              ...headingStyles[item.level || 2]
            }}
          >
            {item.text}
          </HeadingTag>
        );

      case 'list':
        return (
          <ul
            key={index}
            style={{
              ...baseStyle,
              paddingLeft: '24px',
              marginBottom: '24px',
              fontSize: '1.125rem',
              lineHeight: '1.7'
            }}
          >
            {item.items?.map((listItem, listIndex) => (
              <li key={listIndex} style={{ marginBottom: '8px' }}>
                {listItem}
              </li>
            ))}
          </ul>
        );

      case 'table':
        if (!item.data) return null;
        return (
          <div
            key={index}
            style={{
              overflowX: 'auto',
              marginBottom: '24px',
              backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
              borderRadius: '8px',
              padding: '16px'
            }}
          >
            <table style={{
              width: '100%',
              fontSize: '0.875rem',
              borderCollapse: 'collapse' as const
            }}>
              <thead>
                <tr style={{
                  borderBottom: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`
                }}>
                  {item.data.headers.map((header, headerIndex) => (
                    <th
                      key={headerIndex}
                      style={{
                        textAlign: 'left' as const,
                        padding: '8px',
                        color: isDarkMode ? '#ffffff' : '#1f2937',
                        fontFamily: 'Georgia, serif'
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.data.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    style={{
                      borderBottom: rowIndex < item.data!.rows.length - 1 
                        ? `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}` 
                        : undefined
                    }}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        style={{
                          padding: '8px',
                          color: isDarkMode ? '#f3f4f6' : '#1f2937',
                          fontWeight: cellIndex === 0 ? '600' : 'normal',
                          fontFamily: 'Georgia, serif'
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'alert':
        const alertColors = {
          warning: {
            border: isDarkMode ? '#fbbf24' : '#f59e0b',
            bg: isDarkMode ? '#451a03' : '#fef3c7',
            text: isDarkMode ? '#fde68a' : '#92400e'
          },
          info: {
            border: isDarkMode ? '#3b82f6' : '#2563eb',
            bg: isDarkMode ? '#1e3a8a' : '#dbeafe',
            text: isDarkMode ? '#bfdbfe' : '#1e40af'
          },
          success: {
            border: isDarkMode ? '#10b981' : '#059669',
            bg: isDarkMode ? '#064e3b' : '#d1fae5',
            text: isDarkMode ? '#a7f3d0' : '#065f46'
          },
          error: {
            border: isDarkMode ? '#ef4444' : '#dc2626',
            bg: isDarkMode ? '#7f1d1d' : '#fee2e2',
            text: isDarkMode ? '#fca5a5' : '#991b1b'
          }
        };

        const alertColor = alertColors[item.alertType || 'info'];

        return (
          <div
            key={index}
            style={{
              padding: '16px',
              margin: '24px 0',
              borderRadius: '8px',
              border: `1px solid ${alertColor.border}`,
              backgroundColor: alertColor.bg,
              color: alertColor.text,
              fontFamily: 'Georgia, serif'
            }}
            dangerouslySetInnerHTML={{ __html: item.text || '' }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: isDarkMode ? '#111827' : '#ffffff',
        color: isDarkMode ? '#f3f4f6' : '#1f2937',
        transition: 'all 0.3s',
        overflow: 'auto',
        zIndex: 1000
      }}
    >
      {/* Header with theme toggle and close button */}
      <div style={{
        position: 'sticky',
        top: '16px',
        right: '16px',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        padding: '16px 16px 0 0'
      }}>
        <button
          onClick={toggleTheme}
          style={{
            padding: '12px',
            borderRadius: '50%',
            backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
            color: isDarkMode ? '#fbbf24' : '#374151',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <Link href="/routines">
          <button
            style={{
              padding: '12px',
              borderRadius: '50%',
              backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
              color: isDarkMode ? '#ffffff' : '#374151',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <X size={20} />
          </button>
        </Link>
      </div>

      {/* Main content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '24px'
      }}>
        {/* Title and author */}
        <header style={{ marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            marginBottom: '16px',
            lineHeight: '1.2',
            color: isDarkMode ? '#ffffff' : '#1f2937'
          }}>
            {title}
          </h1>
          <p style={{
            fontSize: '1.25rem',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            color: isDarkMode ? '#d1d5db' : '#4b5563'
          }}>
            {author}
          </p>
        </header>

        {/* Content */}
        <div>
          {content.map((item, index) => renderContent(item, index))}
        </div>
      </div>
    </div>
  );
}