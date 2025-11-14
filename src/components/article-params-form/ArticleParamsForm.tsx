import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type FormProps = {
	articleState: ArticleStateType;
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: FormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const sideBar = useRef<HTMLDivElement>(null);

	const [formState, setFormState] = useState<ArticleStateType>(articleState);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
	};

	const handleReset = () => {
		setFormState(articleState);
		setArticleState(articleState);
	};

	useEffect(() => {
		const clickOutsideForm = (event: MouseEvent) => {
			if (
				isOpen &&
				sideBar.current &&
				!sideBar.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', clickOutsideForm);

		return () => {
			document.removeEventListener('mousedown', clickOutsideForm);
		};
	}, [isOpen]);
	return (
		<div ref={sideBar}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((prev) => !prev);
					console.log(`click: ${isOpen}`);
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.title}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
					</div>
					<div className={styles.formContent}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, fontFamilyOption: option }))
							}
						/>
						<RadioGroup
							title='Размер шрифта'
							name='font-size'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, fontSizeOption: option }))
							}
						/>

						<Select
							title='Цвет текста'
							options={fontColors}
							selected={formState.fontColor}
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, fontColor: option }))
							}
						/>

						<Separator />

						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, backgroundColor: option }))
							}
						/>

						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, contentWidth: option }))
							}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>

						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
