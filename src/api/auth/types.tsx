//login

export interface ILoginRequest {
	login: string;
	password: string;
}

export interface ILoginResponse {
	accessToken: string; //подписка всех запросов и кладём их в токен, чтобы запросы приходили. (хранится в самом приложении)
}
