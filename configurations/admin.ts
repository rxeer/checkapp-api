import Koa from 'koa';
import AdminBro from 'admin-bro';
import { buildRouter } from '@admin-bro/koa';
import AdminBroMongoose from '@admin-bro/mongoose';

import User from '@/models/User';
import Incomes from '@/models/Incomes';
import FamilyGroup from '@/models/FamilyGroup';
import Transactions from '@/models/Transactions';
import UserCategory from '@/models/UserCategory';
import IncomeStatistics from '@/models/IncomeStatistics';

AdminBro.registerAdapter(AdminBroMongoose);

const contentNavigation = {
  name: 'Dashboard',
  icon: 'Accessibility',
};

export const configureAdmin = (app: Koa) => {
  const adminBro = new AdminBro({
    databases: [],
    rootPath: '/admin',
    resources: [
      {
        resource: User,
        options: {
          navigation: contentNavigation,
          properties: {
            hash: {
              isVisible: false,
            },
            _id: {
              isVisible: false,
            },
            salt: {
              isVisible: false,
            },
            avatar: {
              isVisible: false,
            },
            password: {
              type: 'string',
              isVisible: {
                list: false,
                edit: true,
                filter: false,
                show: false,
              },
            },
          },
          actions: {
            delete: {
              handler: async (req: any) => {
                await User.deleteOne({ _id: req.params.recordId });
                await UserCategory.deleteMany({ userId: req.params.recordId });
                await FamilyGroup.deleteMany({ userId: req.params.recordId });
                await Incomes.deleteMany({ userId: req.params.recordId });
                await Transactions.deleteMany({ userId: req.params.recordId });
                await IncomeStatistics.deleteMany({
                  userId: req.params.recordId,
                });

                return req;
              },
            },
          },
        },
      },
      {
        resource: FamilyGroup,
        options: {
          navigation: contentNavigation,
        },
      },
      {
        resource: Incomes,
        options: {
          navigation: contentNavigation,
        },
      },
      {
        resource: Transactions,
        options: {
          navigation: contentNavigation,
          listProperties: [
            '_id',
            'userId',
            'count',
            'category.id',
            'familyGroup.id',
            'description',
            'createdDate',
          ],
        },
      },
      {
        resource: UserCategory,
        options: {
          navigation: contentNavigation,
        },
      },
      {
        resource: IncomeStatistics,
        options: {
          navigation: contentNavigation,
        },
      },
    ],
    branding: {
      companyName: 'CheckApp Admin',
    },
  });

  const router = buildRouter(adminBro, app);

  app.use(router.routes()).use(router.allowedMethods());
};
