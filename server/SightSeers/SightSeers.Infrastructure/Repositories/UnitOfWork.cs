using SightSeers.Core.Interfaces;
using SightSeers.Core.Models;
using SightSeers.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace SightSeers.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SightSeersContext _dbContext;

        public UnitOfWork(SightSeersContext dbContext)
        {
            _dbContext = dbContext;
        }

        public int Complete()
        {
            try
            {
                return _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }

        public IRepository<T> GetRepository<T>() where T : BaseEntity
        {
            return new Repository<T>(_dbContext);
        }
    }
}
