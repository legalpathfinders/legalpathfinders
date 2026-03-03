'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useNav } from '@/lib/NavigationStack';
import { supabaseBrowser } from '@/lib/supabase/client';
import { SelectionViewer, useSelectionController } from '@/lib/SelectionViewer';
import { useDialog } from '@/lib/DialogViewer';
import DialogCancel from '@/components/DialogCancel';
import styles from './AdminCRUD.module.css';

interface Column {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'select' | 'boolean' | 'number';
  options?: string[];
  required?: boolean;
}

interface AdminCRUDProps {
  table: string;
  columns: Column[];
  title: string;
}

const SelectItem = ({ onClick, text, theme }: { onClick: () => void; text: string; theme: string }) => {
  return (
    <div
      className={styles.selectItem}
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{ color: theme === 'light' ? '#2d2d2d' : '#f5f0e8' }}
    >
      {text}
    </div>
  );
};

export default function AdminCRUD({ table, columns, title }: AdminCRUDProps) {
  const { theme } = useTheme();
  const nav = useNav();
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectField, setSelectField] = useState<Column | null>(null);
  const [selectId, selectController, selectIsOpen, selectState] = useSelectionController();
  const deleteDialog = useDialog();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const canGoBack = nav.length() > 1;

  useEffect(() => {
    fetchItems();
  }, [table]);

  const fetchItems = async () => {
    const { data } = await supabaseBrowser.from(table).select('*').order('created_at', { ascending: false });
    setItems(data || []);
    console.log('Fetched items:', data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = {};
    columns.forEach(col => {
      const value = formData.get(col.key);
      data[col.key] = col.type === 'boolean' ? value === 'true' : value;
    });

    if (editing?.id) {
      await supabaseBrowser.from(table).update(data).eq('id', editing.id);
    } else {
      await supabaseBrowser.from(table).insert([data]);
    }

    setEditing(null);
    fetchItems();
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    deleteDialog.open(
      <div style={{ textAlign: 'center' }}>
        <p>Are you sure you want to delete this item?</p>
      </div>
    );
  };

  const confirmDelete = async () => {
    if (deletingId) {
      await supabaseBrowser.from(table).delete().eq('id', deletingId);
      fetchItems();
      setDeletingId(null);
    }
    deleteDialog.close();
  };

  const handleSelectOpen = (col: Column) => {
    setSelectField(col);
    selectController.setSelectionState('data');
    selectController.open();
  };

  const handleSelectValue = (value: string) => {
    if (selectField && editing) {
      setEditing({ ...editing, [selectField.key]: value });
    }
    selectController.close();
  };

  return (
    <main className={`${styles.container} ${styles[`container_${theme}`]}`}>
      <header className={`${styles.header} ${styles[`header_${theme}`]}`}>
        <div className={styles.headerContent}>
          {canGoBack && (
            <button className={styles.backButton} onClick={() => nav.pop()} aria-label="Go back">
              <svg className={styles.backIcon} viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0424 0.908364L1.01887 8.84376C0.695893 9.12721 0.439655 9.46389 0.264823 9.83454C0.089992 10.2052 0 10.6025 0 11.0038C0 11.405 0.089992 11.8024 0.264823 12.173C0.439655 12.5437 0.695893 12.8803 1.01887 13.1638L10.0424 21.0992C12.2373 23.0294 16 21.6507 16 18.9239V3.05306C16 0.326231 12.2373 -1.02187 10.0424 0.908364Z" fill="currentColor" />
              </svg>
            </button>
          )}
          <h1 className={styles.title}>{title}</h1>
          <button onClick={() => setEditing({})} className={styles.addBtn}>
            +<span className={styles.addBtnText}> Add New</span>
          </button>
        </div>
      </header>

      <div className={styles.innerBody}>
        {editing && (
          <form onSubmit={handleSave} className={`${styles.form} ${styles[`form_${theme}`]}`}>
            <h2>{editing.id ? 'Edit' : 'Create New'}</h2>
            {columns.map(col => (
              <div key={col.key} className={styles.field}>
                <label>{col.label}</label>
                {col.type === 'textarea' ? (
                  <textarea name={col.key} defaultValue={editing[col.key]} required={col.required} />
                ) : col.type === 'select' ? (
                  <input
                    type="text"
                    value={editing[col.key] || ''}
                    onClick={() => handleSelectOpen(col)}
                    readOnly
                    placeholder={`Select ${col.label}`}
                    required={col.required}
                    style={{ cursor: 'pointer' }}
                  />
                ) : col.type === 'boolean' ? (
                  <div className={styles.switchContainer}>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={editing[col.key] === true || editing[col.key] === 'true'}
                        onChange={(e) => setEditing({ ...editing, [col.key]: e.target.checked })}
                      />
                      <span className={`${styles.slider} ${styles[`slider_${theme}`]}`}></span>
                    </label>
                    <span className={styles.switchLabel}>
                      {editing[col.key] === true || editing[col.key] === 'true' ? 'Yes' : 'No'}
                    </span>
                  </div>
                ) : col.type === 'date' ? (
                  <input 
                    type="date" 
                    name={col.key} 
                    defaultValue={editing[col.key] || new Date().toISOString().split('T')[0]} 
                    required={col.required}
                  />
                ) : (
                  <input type={col.type} name={col.key} defaultValue={editing[col.key]} required={col.required} />
                )}
              </div>
            ))}
            <div className={styles.actions}>
              <button type="submit" className={styles.saveBtn}>Save</button>
              <button type="button" onClick={() => setEditing(null)} className={styles.cancelBtn}>Cancel</button>
            </div>
          </form>
        )}

        <div className={styles.table}>
          {loading ? (
            <p className={styles.loading}>Loading...</p>
          ) : items.length === 0 ? (
            <p className={styles.empty}>No items found. Click "+ Add New" to create one.</p>
          ) : (
            items.map(item => (
              <div key={item.id} className={`${styles.row} ${styles[`row_${theme}`]}`}>
                <div className={styles.content}>
                  {columns.slice(0, 3).map(col => (
                    <div key={col.key}>
                      <strong>{col.label}:</strong> {item[col.key]?.toString() || 'N/A'}
                    </div>
                  ))}
                </div>
                <div className={styles.rowActions}>
                  <button onClick={() => setEditing(item)} className={styles.editBtn}>Edit</button>
                  <button onClick={() => handleDelete(item.id)} className={styles.deleteBtn}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <SelectionViewer
        id={selectId}
        isOpen={selectIsOpen}
        onClose={selectController.close}
        backDrop={true}
        titleProp={{
          text: selectField?.label || 'Select',
          textColor: theme === 'light' ? '#2d2d2d' : '#fff'
        }}
        cancelButton={{
          position: 'right',
          onClick: selectController.close,
          view: <DialogCancel />
        }}
        layoutProp={{
          gapBetweenHandleAndTitle: '16px',
          gapBetweenTitleAndSearch: '8px',
          gapBetweenSearchAndContent: '16px',
          backgroundColor: theme === 'light' ? '#fff' : '#2d2d2d',
          handleColor: '#888',
          handleWidth: '48px'
        }}
        childrenDirection="vertical"
        snapPoints={[0, 1]}
        initialSnap={1}
        minHeight="40vh"
        maxHeight="88vh"
        closeThreshold={0.2}
        selectionState={selectState}
        zIndex={1000}
      >
        {selectField?.options?.map((option) => (
          <SelectItem
            key={option}
            onClick={() => handleSelectValue(option)}
            text={option === 'true' ? 'Yes' : option === 'false' ? 'No' : option}
            theme={theme}
          />
        ))}
      </SelectionViewer>

      <deleteDialog.DialogViewer
        title="Delete Item"
        buttons={[
          {
            text: 'Delete',
            variant: 'danger',
            onClick: confirmDelete
          },
          {
            text: 'Cancel',
            variant: 'secondary',
            onClick: () => deleteDialog.close()
          }
        ]}
        showCancel={false}
        layoutProp={{
          backgroundColor: theme === 'light' ? '#fff' : '#2d2d2d',
          margin: '16px 16px',
          titleColor: theme === 'light' ? '#2d2d2d' : '#f5f0e8'
        }}
      />
    </main>
  );
}
