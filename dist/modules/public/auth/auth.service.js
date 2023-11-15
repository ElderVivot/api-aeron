"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const crypt_1 = require("../../../common/adapters/crypt");
const make_error_request_response_1 = require("../../../common/factories/make-error-request-response");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_repository_1 = require("../user_client/user.repository");
const auth_repository_1 = require("./auth.repository");
let AuthService = class AuthService {
    constructor(jwtService, repository, userRepository) {
        this.jwtService = jwtService;
        this.repository = repository;
        this.userRepository = userRepository;
        this.cryptImplementation = (0, crypt_1.makeCryptImplementation)();
    }
    async validPassword(user, password) {
        return await this.cryptImplementation.compare(password, user.password);
    }
    async getClientsUserHaveAccess(username) {
        const clientsUserHaveAccess = [];
        const showClientsUserHaveAccess = await this.repository.showClientsUserHaveAccess(username);
        if (showClientsUserHaveAccess instanceof make_error_request_response_1.ErrorRequestResponse)
            throw showClientsUserHaveAccess;
        if (showClientsUserHaveAccess.length > 0) {
            for (const clientUser of showClientsUserHaveAccess) {
                clientsUserHaveAccess.push({
                    idUser: clientUser.idUser,
                    username: clientUser.username,
                    idClient: clientUser.idClient,
                    name: clientUser.name,
                    federalRegistration: clientUser.federalRegistration,
                    status: clientUser.status,
                    modules: clientUser.modules
                });
            }
        }
        return clientsUserHaveAccess;
    }
    async signIn(authCredentialsDto) {
        try {
            const { username, password } = authCredentialsDto;
            const user = await this.userRepository.show({ username });
            if (user instanceof make_error_request_response_1.ErrorRequestResponse)
                throw user;
            const passwordIsValid = await this.validPassword(user, password);
            if (!passwordIsValid) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const payload = { tokenId: user.idUser };
            const accessToken = this.jwtService.sign(payload);
            const userAuth = user;
            userAuth.clientsUserHaveAccess = await this.getClientsUserHaveAccess(username);
            return {
                accessToken,
                user: userAuth
            };
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.auth', 'signIn', __filename, error);
        }
    }
    async getDataUser(user) {
        const { username } = user;
        try {
            const user = await this.userRepository.show({ username });
            if (user instanceof make_error_request_response_1.ErrorRequestResponse)
                throw user;
            delete user.password;
            const userAuth = user;
            userAuth.clientsUserHaveAccess = await this.getClientsUserHaveAccess(username);
            return userAuth;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('public.auth', 'getDataUser', __filename, error);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        auth_repository_1.AuthRepository,
        user_repository_1.UserRepository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map