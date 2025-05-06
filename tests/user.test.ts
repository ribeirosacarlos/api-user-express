import { register } from '../src/services/user.service';

test('register user with valid data', async () => {
    const user = await register({
        name: 'Carlos',
        email: 'carlos@example.com',
        password: '123456',
    });
    expect(user).toHaveProperty('id');
})