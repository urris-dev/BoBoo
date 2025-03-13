export const tasks = [
    {
        id: 1,
        title: "Подготовка отчета",
        description: "Собрать данные для ежемесячного отчета.",
        stage: "to do",
        deadline: "2023-10-31",
        subtasks: [
            {
                id: 1,
                title: "Собрать данные о продажах",
                description: "Получить данные о продажах за прошлый месяц.",
                completionStatus: false
            },
            {
                id: 2,
                title: "Анализ данных",
                description: "Проанализировать собранные данные.",
                completionStatus: false
            },
            {
                id: 3,
                title: "Создать графики",
                description: "Создать графики для визуализации данных.",
                completionStatus: false
            },
            {
                id: 4,
                title: "Написать выводы",
                description: "Написать выводы на основе анализа.",
                completionStatus: false
            },
            {
                id: 5,
                title: "Подготовить финальный отчет",
                description: "Собрать все данные в один отчет.",
                completionStatus: false
            }
        ]
    },
    {
        id: 2,
        title: "Создание презентации",
        description: "Подготовить презентацию для встречи с клиентом.",
        stage: "to do",
        deadline: "2023-11-05",
        subtasks: [
            {
                id: 1,
                title: "Собрать информацию о проекте",
                description: "Собрать всю необходимую информацию о проекте.",
                completionStatus: false
            },
            {
                id: 2,
                title: "Создать слайды",
                description: "Подготовить слайды с основными пунктами.",
                completionStatus: false
            },
            {
                id: 3,
                title: "Добавить графику",
                description: "Добавить изображения и графику в презентацию.",
                completionStatus: false
            },
            {
                id: 4,
                title: "Написать текст",
                description: "Написать текст для каждого слайда.",
                completionStatus: false
            },
            {
                id: 5,
                title: "Подготовить речь",
                description: "Подготовить речь для презентации.",
                completionStatus: false
            }
        ]
    },
    {
        id: 3,
        title: "Разработка функционала",
        description: "Разработать новый функционал для приложения.",
        stage: "in progress",
        deadline: "2023-12-01",
        subtasks: [
            {
                id: 1,
                title: "Написать техзадание",
                description: "Подготовить техническое задание для разработки.",
                completionStatus: true
            },
            {
                id: 2,
                title: "Создать архитектуру",
                description: "Разработать архитектуру нового функционала.",
                completionStatus: false
            },
            {
                id: 3,
                title: "Написать код",
                description: "Приступить к написанию кода.",
                completionStatus: false
            },
            {
                id: 4,
                title: "Провести код-ревью",
                description: "Провести код-ревью с командой.",
                completionStatus: false
            },
            {
                id: 5,
                title: "Подготовить документацию",
                description: "Обновить документацию по функционалу.",
                completionStatus: false
            }
        ]
    },
    {
        id: 4,
        title: "Тестирование приложения",
        description: "Провести тестирование нового функционала.",
        stage: "in progress",
        deadline: "2023-12-15",
        subtasks: [
            {
                id: 1,
                title: "Подготовить тест-кейсы",
                description: "Составить тест-кейсы для тестирования.",
                completionStatus: true
            },
            {
                id: 2,
                title: "Провести функциональное тестирование",
                description: "Проверить функционал приложения на соответствие требованиям.",
                completionStatus: true
            },
            {
                id: 3,
                title: "Задокументировать результаты",
                description: "Задокументировать результаты тестирования.",
                completionStatus: false
            },
            {
                id: 4,
                title: "Исправление найденных ошибок",
                description: "Заняться исправлением найденных ошибок.",
                completionStatus: false
            },
            {
                id: 5,
                title: "Проверка исправлений",
                description: "Проверить, что исправления были завершены.",
                completionStatus: false
            }
        ]
    },
    {
        id: 5,
        title: "Обновление документации",
        description: "Обновить документацию согласно изменениям в приложении.",
        stage: "done",
        deadline: "2023-10-15",
        subtasks: [
            {
                id: 1,
                title: "Изучить изменения",
                description: "Изучить изменения, которые необходимо отразить в документации.",
                completionStatus: true
            },
            {
                id: 2,
                title: "Обновить разделы",
                description: "Обновить соответствующие разделы документации.",
                completionStatus: true
            },
            {
                id: 3,
                title: "Проверить форматирование",
                description: "Убедиться, что документация оформлена правильно.",
                completionStatus: true
            },
            {
                id: 4,
                title: "Подготовить финальную версию",
                description: "Составить финальную версию документации.",
                completionStatus: true
            },
            {
                id: 5,
                title: "Разослать команде",
                description: "Разослать обновленную документацию команде.",
                completionStatus: true
            }
        ]
    },
    {
        id: 6,
        title: "Согласование бюджета",
        description: "Согласовать бюджет на следующий квартал.",
        stage: "done",
        deadline: "2023-11-20",
        subtasks: [
            {
                id: 1,
                title: "Подготовить проект бюджета",
                description: "Составить проект бюджета на следующий квартал.",
                completionStatus: true
            },
            {
                id: 2,
                title: "Обсудить с руководством",
                description: "Обсудить проект бюджета с руководством.",
                completionStatus: true
            },
            {
                id: 3,
                title: "Внести корректировки",
                description: "Внести необходимые корректировки в проект.",
                completionStatus: true
            },
            {
                id: 4,
                title: "Подготовить итоговый документ",
                description: "Подготовить итоговый документ по бюджету.",
                completionStatus: true
            },
            {
                id: 5,
                title: "Согласовать с финансами",
                description: "Согласовать итоговый документ с финансовым отделом.",
                completionStatus: true
            }
        ]
    }
];