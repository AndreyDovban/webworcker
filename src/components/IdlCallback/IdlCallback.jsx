/**
 * @module helpers/ DownloadPDF
 */

/** Иконка PDF */
import PdfIcon from '../../assets/react.svg';
/** Css модуль */
import styles from './DownloadPDF.module.css';
import { useState } from 'react';
import cn from 'classnames';

/**
 * Компонент для генерации PDF файла и открытия его в новом окне браузера
 * @param {Object[]} diff_data Массив изменённых объектов
 * @returns {JSXElement}
 */

/** Класс для генерации PDF */
import jsPDF from 'jspdf';
/** Класс для работы с таблицами PDF */
import autoTable from 'jspdf-autotable';

async function func(str) {
	console.log(str);
	/** Подключение шрифтоф */
	const regular = '/fonts/Inter-Regular.ttf';
	const bold = '/fonts/Inter-SemiBold.ttf';
	const black = '/fonts/Inter-Black.ttf';

	/** Функция создания отчёта операции сравнения */
	const styles = {
		lineWidth: 0.1,
		lineColor: 'gray',
		textColor: 'black',
		font: 'regular',
		cellPadding: 1,
		fontSize: 7,
	};
	const headStyles = {
		lineWidth: 0.1,
		fillColor: '#555555',
		lineColor: 'gray',
		textColor: 'white',
		font: 'regular',
		cellPadding: 1,
		fontSize: 8,
	};

	const doc = new jsPDF();
	/** Установка начальных настроект документа */
	doc.setProperties({
		title: 'Web Worker pdf',
		author: 'Web Worker pdf',
		subject: 'Web Worker pdf',
		keywords: '',
		creator: 'jsPDF',
	});
	doc.setLanguage('ru-MO');

	/** Установка курсора */
	let x = 15;
	let y = 10;

	/** Добавление шрифтов */
	doc.addFont(regular, 'regular', 'normal');
	doc.addFont(bold, 'bold', 'normal');
	doc.addFont(black, 'black', 'normal');

	/** Добавление изображения в документ */
	let img = '/logo.png';
	doc.addImage(img, 'PNG', x, y, 35, 0, 'FAST');

	x += 27;
	y += 12;

	x = 40;
	y += 15;

	doc.setFont('bold');
	doc.setFontSize(14);
	doc.setTextColor(20, 20, 20);
	doc.text('Web Worker Pdf', x, y);

	y += 7;

	y += 8;

	let body_attrs = [];
	for (let i = 0; i < 100000; i++) {
		body_attrs.push(['1', '2', '3']);
	}

	autoTable(doc, {
		head: [['11', '22', '33']],
		body: body_attrs,
		didDrawPage: HookData => {
			doc.setFontSize(8);
			doc.setDrawColor('white');
			doc.setFillColor('white');
			doc.rect(90, 285, 40, 20, 'FD');
			doc.setFont('regular');
			doc.text(`${doc.getNumberOfPages()}/PAGE_COUNT`, 100, 290);
			y = HookData.cursor.y;
		},
		startY: y,
		styles: { ...styles, ...{ minCellWidth: 30 } },
		headStyles: headStyles,
		showHead: 'firstPage',
	});

	doc.putTotalPages('PAGE_COUNT');

	// return [doc.output('blob')];
	doc.save('file.pdf');

	/** Сохранение файла */
	// doc.save('WebWorker.pdf', { returnPromise: true }).then(() => console.log('FINISH'));
}

export function IdlCallback({ ...props }) {
	const [dis, setDis] = useState(false);

	return (
		<PdfIcon
			className={cn(styles.block, { [styles.disabled]: dis })}
			{...props}
			onClick={() => {
				console.log('click');
				setDis(true);
				requestIdleCallback(func);
				setDis(false);
			}}
			disabled={true}
		/>
	);
}
